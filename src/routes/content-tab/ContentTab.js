import React from 'react';
import PropTypes from 'prop-types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors} from '../../styles';

import HomeScreen from '../../modules/initial/screens/HomeScreen';
import ReservationScreen from '../../modules/reservation/screens/ReservationScreen';
import ProfileScreen from '../../modules/profile/screens/ProfileScreen';

//ICONS
import IconUser from '../../assets/svg/icons/user.svg';
import IconUser2 from '../../assets/svg/icons/user2.svg';
import IconHouse from '../../assets/svg/icons/house.svg';
import IconHouse2 from '../../assets/svg/icons/house2.svg';
import IconSearch from '../../assets/svg/icons/search.svg';
import IconSearch2 from '../../assets/svg/icons/search2.svg';

const Tab = createBottomTabNavigator();

const HomeTabScreen = function () {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'Home') {
            return focused ? (
              <IconHouse width={wp(5)} height={wp(5)} />
            ) : (
              <IconHouse2 width={wp(5)} height={wp(5)} />
            );
          }

          if (route.name === 'Reservation') {
            return focused ? (
              <IconSearch width={wp(5)} height={wp(5)} />
            ) : (
              <IconSearch2 width={wp(5)} height={wp(5)} />
            );
          }

          if (route.name === 'Profile') {
            return focused ? (
              <IconUser width={wp(5)} height={wp(5)} />
            ) : (
              <IconUser2 width={wp(5)} height={wp(5)} />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.colorPrimary,
        labelStyle: {
          fontSize: wp(3.5),
          fontFamily: 'ChelseaMarket-Regular',
        },
        style: {
          height: wp(15),
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Inicio'}}
      />
      <Tab.Screen
        name="Reservation"
        component={ReservationScreen}
        options={{title: 'Reservar'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Perfil'}}
      />
    </Tab.Navigator>
  );
};

HomeTabScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default HomeTabScreen;
