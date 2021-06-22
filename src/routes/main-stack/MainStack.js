import React, {useEffect, useState} from 'react';
import OneSignal from 'react-native-onesignal';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoadScreen from '../../modules/initial/screens/LoadScreen';
import RegisterScreen from '../../modules/authentication/screens/RegisterScreen';
import LoginScreen from '../../modules/authentication/screens/LoginScreen';
import HomeTabScreen from '../content-tab/ContentTab';
import ReservationDetailScreen from '../../modules/reservation/screens/ReservationDetailScreen';
import MyReservationsScreen from '../../modules/reservation/screens/MyReservationsScreen';
import ReservationMessageScreen from '../../modules/reservation/screens/ReservationMessageScreen';
import BusinessScreen from '../../modules/reservation/screens/BusinessScreen';
import UpdateProfileScreen from '../../modules/profile/screens/UpdateProfileScreen';
import ContactScreen from '../../modules/profile/screens/ContactScreen';
import SupportScreen from '../../modules/profile/screens/SupportScreen';
import FavoritesScreen from '../../modules/profile/screens/FavoritesScreen';
import FavoriteReservationScreen from '../../modules/reservation/screens/FavoriteReservationScreen';

import RecoveryPassScreen from '../../modules/recovey/screens/RecoveryPass1Screen';
import RecoveryPass2Screen from '../../modules/recovey/screens/RecoveryPass2Screen';
import RecoveryPass3Screen from '../../modules/recovey/screens/RecoveryPass3Screen';

import ReservationServices from '../../services/reservationServices';

import {SET_THERE_IS_NOTIFICATION} from '../../redux/constants/notificationConstants';

const Stack = createStackNavigator();

const StackMainNavigator = function ({user, isLoggedIn, dispatch}) {
  const [initialRoute] = useState('Load');

  useEffect(() => {
    //ea128c3e-ddc0-4b44-a813-46d25a292e58

    // mío: 896ef6d2-47d0-424b-834d-bc60d45b7698
    OneSignal.setAppId('ea128c3e-ddc0-4b44-a813-46d25a292e58');

    if (isLoggedIn) {
      OneSignal.getDeviceState().then(async (data) => {
        //6c08c2d5-3941-449a-b05d-9e8211a61002
        try {
          await ReservationServices.saveSubscriptionNotificationReservation(
            data.userId,
          );
          //console.log(response.data); LA DATA DE LA NOTIFICACION
        } catch (error) {
          //console.log(error);
          //console.log(error.response.data);
        }
      });
    }

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        let notif = notifReceivedEvent.getNotification();
        if (isLoggedIn) {
          notifReceivedEvent.complete(notif);
        } else {
          notifReceivedEvent.complete();
        }
      },
    );

    OneSignal.setNotificationOpenedHandler((notification) => {
      dispatch({
        type: SET_THERE_IS_NOTIFICATION,
        payload: true,
      });
      //console.log('OneSignal: notification opened:', notification);
    });
  }, [isLoggedIn, user]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={initialRoute}>
        <Stack.Screen component={LoadScreen} name="Load" />
        <Stack.Screen component={RegisterScreen} name="Register" />
        <Stack.Screen component={LoginScreen} name="Login" />
        <Stack.Screen component={HomeTabScreen} name="HomeTab" />
        <Stack.Screen
          component={ReservationDetailScreen}
          name="ReservationDetail"
        />
        <Stack.Screen component={MyReservationsScreen} name="MyReservation" />
        <Stack.Screen
          component={ReservationMessageScreen}
          name="ReservationMessage"
        />
        <Stack.Screen component={BusinessScreen} name="Business" />
        <Stack.Screen component={UpdateProfileScreen} name="UpdateProfile" />
        <Stack.Screen component={ContactScreen} name="Contact" />
        <Stack.Screen component={SupportScreen} name="Support" />
        <Stack.Screen component={RecoveryPassScreen} name="Recovery1" />
        <Stack.Screen component={RecoveryPass2Screen} name="Recovery2" />
        <Stack.Screen component={RecoveryPass3Screen} name="Recovery3" />
        <Stack.Screen component={FavoritesScreen} name="Favorites" />
        <Stack.Screen
          component={FavoriteReservationScreen}
          name="FavoriteReservation"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  const {user, isLoggedIn} = state.auth;
  return {
    user,
    isLoggedIn,
  };
};

export default connect(mapStateToProps)(StackMainNavigator);
