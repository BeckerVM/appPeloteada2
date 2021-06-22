import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Typography, Spacing} from '../../../styles';

import BushDesign from '../../../assets/svg/designs/bush.svg';

const ReservationMessageScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <BushDesign width={wp(70)} height={wp(45)} />
        <Text
          style={[
            styles.text,
            {...Typography.fontTextSemiBold, fontSize: wp(7)},
          ]}>
          ¡Ya casi!
        </Text>
        <Text style={[styles.text, {width: wp(80), color: Colors.colorGray2}]}>
          No olvides realizar tu pago en la próxima hora para confirmar tu
          reserva con éxito.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeTab'}],
          });
        }}>
          <Text style={styles.textBtn}>Volver al Inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReservationMessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.colorWhite
  },
  subcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Typography.fontTextNormal,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: Colors.colorPrimary,
    width: wp(50),
    height: wp(13.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    ...Spacing.marginTopSm,
  },
  textBtn: {
    color: Colors.colorWhite,
    ...Typography.fontTextNormal,
  },
});
