import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

import {Layout, Colors} from '../../../styles';

import Logo from '../../../assets/svg/designs/logo-mobile.svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {verifyAuth} from '../../../redux/actions/authActions';

const LoadScreen = function ({navigation, dispatch}) {
  React.useEffect(() => {
    dispatch(verifyAuth())
      .then(() => {
        navigateRoute('HomeTab')
      })
      .catch(() => {
        navigateRoute('Login')
      });
  }, []);

  const navigateRoute = (nameRoute) => {
    setTimeout(() => {
      navigation.replace(nameRoute);
    }, 1500);
  }

  return (
    <View
      style={{
        ...Layout.screenPrimary,
        backgroundColor: Colors.colorWhite,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Logo width={wp(60)} height={wp(60)} style={{marginRight: wp(4)}} />
      </View>
    </View>
  );
};

export default connect()(LoadScreen);
