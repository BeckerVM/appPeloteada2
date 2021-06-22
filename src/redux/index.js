import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {authReducer} from './reducers/authReducer';
import {reservationReducer} from './reducers/reservationReducer';
import {loadingReducer} from './reducers/loadingReducer';
import {notificationReducer} from './reducers/notificationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  reservation: reservationReducer,
  loading: loadingReducer,
  notification: notificationReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
