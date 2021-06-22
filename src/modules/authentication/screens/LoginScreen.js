import React from 'react';
import {StatusBar} from 'react-native';
import {useStatusBar} from '../../../hooks/useStatusBar';

import {ScrollView} from 'react-native';

import HeaderLogin from '../components/header-login/HeaderLogin';
import LoginForm from '../components/login-form/LoginForm';

const LoginScreen = function ({navigation}) {
  const {showBar} = useStatusBar();

  return (
    <ScrollView style={{backgroundColor: '#FFF'}}>
      <HeaderLogin />
      {showBar ? (
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
      ) : null}
      <LoginForm navigation={navigation} />
    </ScrollView>
  );
};

export default LoginScreen;
