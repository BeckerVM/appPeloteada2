import {LOGIN_SUCCESS, LOGOUT} from '../constants/authConstants';
import {SET_LOADING} from '../constants/loadingConstants';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthServices from '../../services/authServices';
import jwt_decode from 'jwt-decode';

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({type: SET_LOADING, payload: true});
  try {
    const response = await AuthServices.login(email, password);
    const token = JSON.stringify(response.data.token);
    const userDecoded = jwt_decode(token);
    await AsyncStorage.setItem('authToken', token);
    dispatch({type: LOGIN_SUCCESS, payload: {token, user: userDecoded}});
    dispatch({type: SET_LOADING, payload: false});
    return Promise.resolve();
  } catch (error) {
    dispatch({type: SET_LOADING, payload: false});
    return Promise.reject(error.response.data.message);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await AuthServices.logout();
    await AsyncStorage.removeItem('authToken');
    dispatch({
      type: LOGOUT,
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};

export const registerUser = (name, email, password, surname) => async (
  dispatch,
) => {
  dispatch({type: SET_LOADING, payload: true});

  try {
    const response = await AuthServices.register(
      name,
      email,
      password,
      surname,
    );
    const token = JSON.stringify(response.data.token);
    
    const userDecoded = jwt_decode(token);
    await AsyncStorage.setItem('authToken', token);
    console.log(token)
    console.log(userDecoded)

    dispatch({type: SET_LOADING, payload: false});
    dispatch({type: LOGIN_SUCCESS, payload: {token, user: userDecoded}});

    return Promise.resolve(response.data.message);
  } catch (error) {
    dispatch({type: SET_LOADING, payload: false});
    return Promise.reject(error.response.data.message);
  }
};

export const verifyAuth = () => async (dispatch) => {
  //VERIFICA SI EXISTE EL TOKEN Y ASIGNA NUEVAMENTE LOS DATOS EN EL REDUCTOR
  const token = await AsyncStorage.getItem('authToken');

  if (token) {
    const userDecoded = jwt_decode(token);
    dispatch({type: LOGIN_SUCCESS, payload: {token, user: userDecoded}});
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};
