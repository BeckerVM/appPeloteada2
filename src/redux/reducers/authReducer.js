import {
  LOGIN_SUCCESS,
  LOGOUT,
  ADD_FAVORITES,
  DELETE_FAVORITES,
  SET_FAVORITES,
} from '../constants/authConstants';

const initialState = {
  user: {name: '', email: ''},
  token: null,
  isLoggedIn: false,
  favorites: [],
};

export const authReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: payload.token,
        user: payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        user: {name: '', email: ''},
        favorites: []
      };
    case ADD_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, {...payload}],
      };
    case DELETE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.court._id !== payload),
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: [...payload],
      };
    default:
      return state;
  }
};
