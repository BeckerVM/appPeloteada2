import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {
  StyleSheet,
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

import {SET_LOADING_2} from '../../../reservation/../../redux/constants/loadingConstants';
import {CLEAR_BUSINESS_INFO_AND_COURTS} from '../../../reservation/../../redux/constants/reservationConstants';

const HeaderBusiness = ({dispatch, businessInfo}) => {
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      dispatch({
        type: CLEAR_BUSINESS_INFO_AND_COURTS,
      });

      dispatch({
        type: SET_LOADING_2,
        payload: true,
      });
    };
  }, []);
  return (
    <ImageBackground
      source={{
        uri: businessInfo.profileUrl,
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
          onPress={() => {
            navigation.goBack();
          }}>
          <IconArrowLeft width={wp(7)} height={wp(7)} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

HeaderBusiness.propTypes = {
  businessInfo: PropTypes.object,
};

const mapStateToProps = (state) => {
  const {businessInfo} = state.reservation;

  return {
    businessInfo,
  };
};

export default connect(mapStateToProps)(HeaderBusiness);

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
    fontSize: wp(6),
    textAlign: 'center',
    width: wp(80),
    ...Spacing.marginBottomLg,
  },
  button: {
    position: 'absolute',
    top: StatusBar.currentHeight + wp(2),
    left: wp(3),
    padding: wp(2),
    borderRadius: wp(100),
  },
});
