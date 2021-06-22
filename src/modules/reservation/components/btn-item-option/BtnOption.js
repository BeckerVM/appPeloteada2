import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

import IconBall from '../../../../assets/svg/icons/ball.svg';
import IconWifi from '../../../../assets/svg/icons/wifi.svg';
import IconStore from '../../../../assets/svg/icons/tienda.svg';
import IconCar from '../../../../assets/svg/icons/car.svg';
import IconToilet from '../../../../assets/svg/icons/bano.svg';

const BtnOption = ({data}) => {
  return (
    <View style={styles.btnOption}>
      {data.title === 'Futbol' ? (
        <IconBall width={wp(10)} height={wp(10)} />
      ) : null}
      {data.title === 'parking' ? (
        <IconCar width={wp(10)} height={wp(10)} />
      ) : null}
      {data.title === 'store' ? (
        <IconStore width={wp(10)} height={wp(10)} />
      ) : null}
      {data.title === 'toilet' ? (
        <IconToilet width={wp(10)} height={wp(10)} />
      ) : null}
      {data.title === 'wifi' ? (
        <IconWifi width={wp(10)} height={wp(10)} />
      ) : null}
      <Text
        style={{
          ...Typography.fontTextNormal,
          fontSize: wp(3.5),
          textAlign: 'center',
        }}>
        {data.title === 'Futbol' ? 'Futbol' : null}
        {data.title === 'parking' ? 'Parqueo' : null}
        {data.title === 'wifi' ? 'Wifi' : null}
        {data.title === 'toilet' ? 'Baño' : null}
        {data.title === 'store' ? 'Tienda' : null}
      </Text>
    </View>
  );
};

BtnOption.propTypes = {
  data: PropTypes.object,
};

export default BtnOption;

const styles = StyleSheet.create({
  btnOption: {
    width: wp(27),
    height: wp(30),
    borderColor: Colors.colorGray,
    borderWidth: wp(0.2),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(1.5),
    ...Spacing.marginRightXm
  },
});
