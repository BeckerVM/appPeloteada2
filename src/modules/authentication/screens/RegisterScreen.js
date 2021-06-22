import React from 'react';
import {StatusBar} from 'react-native';
import {useStatusBar} from '../../../hooks/useStatusBar';
import {ScrollView} from 'react-native';

import HeaderRegister from '../components/header-register/HeaderRegister';
import RegisterForm from '../components/register-form/RegisterForm';

const RegisterScreen = function ({navigation}) {
  const {showBar} = useStatusBar();

  return (
    <ScrollView style={{backgroundColor: '#FFF'}}>
      {showBar ? (
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
      ) : null}
      <HeaderRegister />
      <RegisterForm navigation={navigation} />
    </ScrollView>
  );
};

export default RegisterScreen;
