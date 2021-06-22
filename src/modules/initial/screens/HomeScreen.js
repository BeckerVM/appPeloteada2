import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import {View, ScrollView, Text} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Layout, Colors, Spacing} from '../../../styles';

import HeaderProfile from '../components/header-profile/HeaderProfile';
import MyReservationList from '../components/myreservation-list/MyReservationList';
import FieldList from '../components/field-list/FieldList';

import {SET_THERE_IS_NOTIFICATION} from '../../../redux/constants/notificationConstants';
import {SET_LOADING} from '../../../redux/constants/loadingConstants';

import {API_URL, authHeader} from '../../../utils/api';
import axios from 'axios';

const HomeScreen = ({loaded, thereIsNotification, navigation, dispatch}) => {
  const [popularBusiness, setPopularBusiness] = useState([]);

  useEffect(() => {
    if (thereIsNotification) {
      navigation.navigate('MyReservation');
      dispatch({
        type: SET_THERE_IS_NOTIFICATION,
        payload: false,
      });
    }
  }, [thereIsNotification]);

  useEffect(() => {
    getPopularBusiness();
  }, []);

  const getPopularBusiness = async () => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    try {
      const headers = await authHeader();
      const response = await axios.get(`${API_URL}/business/popular`, {
        headers,
      });
      setPopularBusiness([...response.data.data]);
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    } catch (error) {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    }
  };

  return (
    <View
      style={{
        ...Layout.screenPrimary,
        backgroundColor: Colors.colorWhite,
        ...Spacing.paddingHorizontalXm,
      }}>
      <HeaderProfile />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyReservationList loaded={loaded} />
        <FieldList data={popularBusiness} loaded={loaded} />
      </ScrollView>
    </View>
  );
};

HomeScreen.propTypes = {
  loaded: PropTypes.bool,
  thereIsNotification: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {loaded} = state.loading;
  const {thereIsNotification} = state.notification;

  return {
    loaded,
    thereIsNotification,
  };
};

export default connect(mapStateToProps)(HomeScreen);
