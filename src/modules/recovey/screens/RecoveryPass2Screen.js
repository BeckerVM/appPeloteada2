import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Layout, Colors, Spacing, Typography} from '../../../styles';

import IconProtected from '../../../assets/svg/icons/protected.svg';

import CodeForm from '../components/code-form/CodeForm';

const RecoveryPass1Screen = ({route}) => {
  const {email} = route.params
  return (
    <View style={{...Layout.screenScroll, ...Layout.screenWhite}}>
      <View style={styles.header}>
        <Text style={{...Typography.fontTextNormal, fontSize: wp(4.5)}}>
          Verificar Correo Electrónico
        </Text>
      </View>
      <ScrollView>
      <View style={styles.contentCenter}>
        <IconProtected width={wp(45)} height={wp(45)} />
        <Text style={{ textAlign: 'center', ...Typography.fontTextNormal, color: Colors.colorGray2, ...Spacing.marginTopMd, width: wp(95) }}>
          Por favor ingrese el código de 4 dígitos enviado al correo electrónico {email} para cambiar su contraseña.
        </Text>
      </View>
      <CodeForm email={email} />
      </ScrollView>
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
