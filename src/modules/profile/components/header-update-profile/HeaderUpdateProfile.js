import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Typography, Colors, Layout} from '../../../../styles';

import IconArrowLeft from '../../../../assets/svg/icons/arrow-left.svg';

export default function HeaderUpdateProfile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}>
        <IconArrowLeft width={wp(7)} height={wp(7)} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Layout.screenScroll,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    height: wp(70),
  },
  button: {
    borderRadius: wp(100),
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(3),
  },
  btnText: {
    ...Typography.fontTextNormal,
    color: Colors.colorPrimary,
    fontSize: wp(4.5),
  },
});
