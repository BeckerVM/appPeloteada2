import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keyboard, Alert} from 'react-native';
import axios from 'axios';

import {API_URL, authHeader} from '../../../../utils/api';
import {SET_LOADING} from '../../../../redux/constants/loadingConstants';
import {LOGIN_SUCCESS} from '../../../../redux/constants/authConstants';

export const useProfileForm = (dispatch, navigation) => {
  //const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = async ({name, surname}, {resetForm}) => {
    Keyboard.dismiss();
    dispatch({type: SET_LOADING, payload: true});
    try {
      const headers = await authHeader();
      const response = await axios.post(
        `${API_URL}/user/edit`,
        {name, lastName: surname},
        {headers},
      );
      const token = JSON.stringify(response.data.token);
      const userDecoded = jwt_decode(token);
      await AsyncStorage.setItem('authToken', token);
      dispatch({type: LOGIN_SUCCESS, payload: {token, user: userDecoded}});
      dispatch({type: SET_LOADING, payload: false});
      showAlert('Sus datos fueron actualizados correctamente.')
    } catch (error) {
      dispatch({type: SET_LOADING, payload: false});
    }
  };

  const showAlert = (
    message,
  ) =>
    Alert.alert('Datos actualizados', message, [
      {
        text: 'OK',
        onPress: () => {
          navigation.goBack()
        },
      },
    ]);

  return {
    handleSubmit,
  };
};
