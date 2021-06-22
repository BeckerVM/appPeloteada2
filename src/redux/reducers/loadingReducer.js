import {SET_LOADING, SET_LOADING_2, SET_LOADING_3} from '../constants/loadingConstants';

const initialState = {
  loaded: false,//EL DE USO GENERAL
  loaded2: true,//PARA EL DE MIS RESERVAS
  loaded3: true,//PARA LOS FAVORITOS DEL HOME
};

export const loadingReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_LOADING:
      return {...state, loaded: payload};
    case SET_LOADING_2:
      return {
        ...state,
        loaded2: payload,
      };
    case SET_LOADING_3: 
      return {
        ...state, 
        loaded3: payload
      }
    default:
      return state;
  }
};
