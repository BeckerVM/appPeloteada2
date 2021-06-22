import {
  SET_BUSINESS_WITH_FIELDS,
  SET_FIELDS_BY_BUSINESS,
  SET_MY_RESERVATIONS,
  SET_BUSINESS_INFO,
} from '../constants/reservationConstants';
import {SET_LOADING, SET_LOADING_2} from '../constants/loadingConstants';

import ReservationServices from '../../services/reservationServices';

export const getBusinessWithFields = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const response = await ReservationServices.getFieldsByBusiness(data);

    dispatch({
      type: SET_BUSINESS_WITH_FIELDS,
      payload: [...response.data.data],
    });

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const getFieldsInBusiness = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING_2,
    payload: true,
  });

  try {
    const response = await ReservationServices.getFieldsInBusiness({
      business: data.business,
      day: data.day,
      start: data.start,
      end: data.end,
    });

    dispatch({
      type: SET_FIELDS_BY_BUSINESS,
      payload: [...response.data.data],
    });

    dispatch({
      type: SET_LOADING_2,
      payload: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING_2,
      payload: false,
    });
  }
};

export const getMyReservations = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING_2,
    payload: true,
  });

  try {
    const response = await ReservationServices.getMyReservations();
    dispatch({
      type: SET_MY_RESERVATIONS,
      payload: response.data.data,
    });
    dispatch({
      type: SET_LOADING_2,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: SET_LOADING_2,
      payload: false,
    });
  }
};

export const getBusinessInfo = (id) => async (dispatch) => {
  try {
    const response = await ReservationServices.getInfoBusiness(id);
    dispatch({
      type: SET_BUSINESS_INFO,
      payload: response.data.data,
    });
  } catch (error) {}
};
