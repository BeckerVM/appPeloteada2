import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Layout, Colors, Spacing, Typography} from '../../../styles';

import IconEnvelope from '../../../assets/svg/icons/envelope.svg';

import EmailForm from '../components/email-form/EmailForm'

const RecoveryPass1Screen = () => {
  return (
    <View style={{...Layout.screenScroll, ...Layout.screenWhite}}>
      <View style={styles.header}>
        <Text style={{...Typography.fontTextNormal, fontSize: wp(4.5)}}>
          Recuperar Contraseña
        </Text>
      </View>
      <ScrollView>
      <View style={styles.contentCenter}>
        <IconEnvelope width={wp(45)} height={wp(45)} />
        <Text style={{ textAlign: 'center', ...Typography.fontTextNormal, color: Colors.colorGray2, ...Spacing.marginTopMd, width: wp(95)}}>
          Por favor ingrese su dirección de correo electrónico para recibir un
          código de verficación.
        </Text>
      </View>
      <EmailForm /></ScrollView>
    </View>
  );
};

export default RecoveryPass1Screen;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: wp(10),
  },
  btnTextBack: {
    ...Typography.fontTextNormal,
    ...Spacing.marginTopXm,
  },
  contentCenter: {
    alignItems: 'center',
  },
});
