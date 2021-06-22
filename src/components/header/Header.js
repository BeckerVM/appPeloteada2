import React from 'react';
import {StatusBar} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BoxShadow} from 'react-native-shadow';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Typography, Colors, Spacing} from '../../styles/index';

import IconArrowLeft from '../../assets/svg/icons/arrow-left.svg';

const shadowOpt = {
  width: wp(100),
  height: wp(23),
  color: Colors.colorBlack,
  border: 2,
  radius: 1,
  opacity: 0.2,
  x: 0,
  y: 0.2,
};

const Header = ({title}) => {
  const navigation = useNavigation();

  return (
    <BoxShadow setting={shadowOpt}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <IconArrowLeft width={wp(7)} height={wp(7)} />
        </TouchableOpacity>
        <Text
          style={{
            ...Typography.fontTextNormal,
            color: Colors.colorWhite,
            fontSize: wp(5),
          }}>
          {title}
        </Text>
      </View>
    </BoxShadow>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    backgroundColor: Colors.colorPrimary,
    height: wp(23),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  button: {
    position: 'absolute',
    left: wp(2),
    padding: wp(2),
    borderRadius: wp(100),
    top: wp(10)
  },
});
