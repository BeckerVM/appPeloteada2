import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Typography, Colors} from '../../../../styles';

import Header from '../../../../assets/svg/designs/header-login.svg';

const HeaderLogin = () => {
  return (
    <View style={styles.containerHeader}>
      <Header width={wp(100.3)} height={wp(75.5)} style={{marginTop: -wp(0.1)}} />
      <View style={styles.containerTextHeader}>
        <Text style={[styles.textHeader]}>Bienvenido</Text>
        <Text style={[styles.textHeader, styles.textHeader2]}>Inicia Sesión</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    position: 'relative',
  },
  containerTextHeader: {
    position: 'absolute',
    top: wp(25),
    left: 0,
    paddingLeft: wp(3),
  },
  textHeader: {
    ...Typography.fontTextNormal,
    color: Colors.colorWhite,
    fontSize: wp(5),
  },
  textHeader2: {
    ...Typography.fontTextNormal,
    fontSize: wp(10),
    marginTop: -wp(2),
  },
});

export default HeaderLogin;
