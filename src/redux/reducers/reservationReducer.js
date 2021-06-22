import {
  SET_FILTER_MODAL_DAYS,
  SET_BUSINESS_WITH_FIELDS,
  SET_FIELDS_BY_BUSINESS,
  SET_MY_RESERVATIONS,
  SET_BUSINESS_INFO,
  CLEAR_BUSINESS_INFO_AND_COURTS,
} from '../constants/reservationConstants';

const initialState = {
  filterModalDays: [],
  business: [],
  fieldsByBusiness: [],
  myReservations: [],
  businessInfo: {
    _id: '',
    adress: '',
    description: '',
    courts: 0,
    name: '',
    phones: [],
    services: [],
  },
};

export const reservationReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_FILTER_MODAL_DAYS:
      return {
        ...state,
        filterModalDays: [...payload],
      };
    case SET_BUSINESS_WITH_FIELDS:
      return {
        ...state,
        business: [...payload],
      };
    case SET_FIELDS_BY_BUSINESS:
      return {
        ...state,
        fieldsByBusiness: [...payload],
      };
    case SET_MY_RESERVATIONS:
      return {
        ...state,
        myReservations: [...payload],
      };
    case SET_BUSINESS_INFO:
      return {
        ...state,
        businessInfo: {
          ...payload,
        },
      };
    case CLEAR_BUSINESS_INFO_AND_COURTS:
      return {
        ...state,
        businessInfo: {
          _id: '',
          adress: '',
          description: '',
          courts: 0,
          name: '',
          phones: [],
          services: [],
        },
        fieldsByBusiness: [],
      };
    default:
      return state;
  }
};
