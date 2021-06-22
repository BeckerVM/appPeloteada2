import React from 'react';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors, Layout} from '../../../../styles';

import IconArrowLeft from '../../../../assets/svg/icons/arrow-left.svg';

const HeaderReservationDetail = ({
  nameBusiness,
  nameField,
  sizeField,
  imageField,
}) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={{
        uri:
          imageField !== ''
            ? imageField
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaI7ty0isZjoP-Qa0RKkood8ulWFVqGLhO4g&usqp=CAU',
      }}
      style={styles.image}>
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <IconArrowLeft width={wp(7)} height={wp(7)} />
        </TouchableOpacity>
        <Text style={styles.text}>
          {nameBusiness} . {nameField} . {sizeField} vs {sizeField}
        </Text>
      </View>
    </ImageBackground>
  );
};

HeaderReservationDetail.propTypes = {
  nameField: PropTypes.string,
  nameBusiness: PropTypes.string,
  sizeField: PropTypes.number,
  imageField: PropTypes.string,
};

export default HeaderReservationDetail;

const styles = StyleSheet.create({
  image: {
    width: wp(100),
    height: hp(32),
    resizeMode: 'cover',
    position: 'relative',
  },
  container: {
    ...Layout.screenScroll,
    width: wp(100),
    height: hp(32),
    backgroundColor: 'rgba(0, 0, 0, .4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Typography.fontTextNormal,
    color: Colors.colorWhite,
    fontSize: wp(4.5),
    textAlign: 'center',
    width: wp(80),
    ...Spacing.marginBottomLg,
  },
  button: {
    position: 'absolute',
    top: StatusBar.currentHeight + wp(2),
    left: wp(2),
    padding: wp(2),
    borderRadius: wp(100),
  },
});
