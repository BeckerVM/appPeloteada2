import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Layout, Colors, Spacing, Typography} from '../../../styles';

import IconLock from '../../../assets/svg/icons/lock2.svg';

import NewForm from '../components/new-form/NewForm'

const RecoveryPass3Screen = ({route}) => {
  const {email} = route.params

  return (
    <View style={{...Layout.screenScroll, ...Layout.screenWhite}}>
      <View style={styles.header}>
        <Text style={{...Typography.fontTextNormal, fontSize: wp(4.5)}}>
          Nueva Contraseña
        </Text>
        <TouchableOpacity>
          <Text style={styles.btnTextBack}>Regresar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentCenter}>
        <IconLock width={wp(45)} height={wp(45)} />
        <Text style={{ textAlign: 'center', ...Typography.fontTextNormal, color: Colors.colorGray2, ...Spacing.marginTopMd, width: wp(95)}}>
          Su nueva contraseña debe ser diferente de la usada anteriormente.
        </Text>
      </View>
      <NewForm  email={email} />
    </View>
  );
};

export default RecoveryPass3Screen;

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
    ...Spacing.marginBottomXm
  },
});
