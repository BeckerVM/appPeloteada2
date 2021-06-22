import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import axios from 'axios';
import {API_URL, authHeader} from '../../../../utils/api';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Typography, Colors, Spacing} from '../../../../styles';
import IconEdit from '../../../../assets/svg/icons/edit.svg';

const HeaderProfile = ({user}) => {
  const navigation = useNavigation()

  const getDataProfile = async () => {
    try {
      const headers = await authHeader();
      const response = await axios.get(`${API_URL}/user/profile`, {headers})
      const {name, lastName, profileUrl} = response.data.data

      navigation.navigate('UpdateProfile', { name, surname: lastName, profile: profileUrl})
    } catch (error) {
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Hola {user.name.trim()}!</Text>
      <TouchableOpacity onPress={() => getDataProfile()} style={{...Spacing.marginTopXm}}>
        <IconEdit width={wp(6)} height={wp(6)} />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  const {user} = state.auth;

  return {
    user,
  };
};
export default  connect(mapStateToProps)(HeaderProfile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorPrimary,
    height: wp(70),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: wp(12),
  },
  image: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(100),
    resizeMode: 'cover',
    ...Spacing.marginRightXm,
  },
  text: {
    ...Typography.fontTextNormal,
    color: Colors.colorWhite,
    fontSize: wp(4.5),
  },
});
