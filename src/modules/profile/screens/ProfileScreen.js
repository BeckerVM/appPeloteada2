import React from 'react';
import {useStatusBar} from '../../../hooks/useStatusBar';
import {StyleSheet, View, StatusBar} from 'react-native';

import HeaderProfile from '../components/header-profile/HeaderProfile';
import MenuProfile from '../components/menu-profile/MenuProfile';

import {Colors} from '../../../styles';

const ProfileScreen = () => {
  const {showBar} = useStatusBar();

  return (
    <View style={styles.container}>
      {showBar ? (
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
      ) : null}
      <HeaderProfile />
      <MenuProfile />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorWhite,
    flex: 1,
  },
});
