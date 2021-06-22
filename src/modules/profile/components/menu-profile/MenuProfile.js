import React from 'react';
import OneSignal from 'react-native-onesignal';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Typography, Colors, Spacing} from '../../../../styles';

import IconReservation from '../../../../assets/svg/icons/reservation.svg';
import IconFavorite3 from '../../../../assets/svg/icons/favorite3.svg';
import IconFavorite4 from '../../../../assets/svg/icons/favorite4.svg';
import IconConfig from '../../../../assets/svg/icons/config.svg';
import IconArrow from '../../../../assets/svg/icons/arrow-right.svg';
import IconLogout from '../../../../assets/svg/icons/logout.svg';

import {logoutUser} from '../../../../redux/actions/authActions';

const MenuProfile = ({dispatch}) => {
  const navigation = useNavigation();

  const handleLogout =  () => {
    dispatch(logoutUser())
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      })
      .catch(() => {
      });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MyReservation')}
        style={styles.containerItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.containerIcon}>
            <IconReservation width={wp(7)} height={wp(7)} />
          </View>
          <Text style={styles.text}>Mis reservas</Text>
        </View>
        <IconArrow width={wp(2)} height={wp(2)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerItem} onPress={() => navigation.navigate('Favorites')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.containerIcon}>
            <IconFavorite3 width={wp(7)} height={wp(7)} />
          </View>
          <Text style={styles.text}>Canchas favoritas</Text>
        </View>
        <IconArrow width={wp(2)} height={wp(2)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerItem} onPress={() => navigation.navigate('Contact')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.containerIcon}>
            <IconConfig width={wp(7)} height={wp(7)} />
          </View>
          <Text style={styles.text}>Contáctanos</Text>
        </View>
        <IconArrow width={wp(2)} height={wp(2)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerItem} onPress={() => navigation.navigate('Support')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.containerIcon}>
            <IconFavorite4 width={wp(7)} height={wp(7)} />
          </View>
          <Text style={styles.text}>Apóyanos</Text>
        </View>
        <IconArrow width={wp(2)} height={wp(2)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerItem} onPress={() => handleLogout()}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.containerIcon}>
            <IconLogout width={wp(7)} height={wp(7)} />
          </View>
          <Text style={styles.text}>Cerrar sesión</Text>
        </View>
        
      </TouchableOpacity>
    </View>
  );
};

export default  connect()(MenuProfile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorWhite,
    flex: 1,
    borderTopRightRadius: wp(18),
    borderTopLeftRadius: wp(18),
    marginTop: -wp(30),
    borderColor: 'rgba(0, 0, 0, .2)',
    borderTopWidth: wp(0.5),
    paddingVertical: wp(6),
    paddingHorizontal: wp(6),
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: wp(0.1),
    paddingVertical: wp(2.8),
    borderColor: Colors.colorGray,
  },
  text: {
    ...Typography.fontTextNormal,
    color: Colors.colorGray2
  },
  containerIcon: {
    width: wp(13),
    height: wp(13),
    justifyContent: 'center',
    alignItems: 'center',
    ...Spacing.marginRightXm,
    backgroundColor: Colors.colorGray,
    borderRadius: wp(100)
  },
});
