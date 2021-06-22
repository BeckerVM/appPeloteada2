import {SET_THERE_IS_NOTIFICATION} from '../constants/notificationConstants';

const initialState = {
  thereIsNotification: false,
};

export const notificationReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_THERE_IS_NOTIFICATION:
      return {
        ...state,
        thereIsNotification: payload,
      };
    default:
      return state;
  }
};
