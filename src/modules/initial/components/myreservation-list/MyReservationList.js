import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

import MyReservationItem from '../myreservation-item/MyReservationItem';

import AuthServices from '../../../../services/authServices';
import {SET_FAVORITES} from '../../../../redux/constants/authConstants';
import {SET_LOADING_3} from '../../../../redux/constants/loadingConstants';

const MyReservationList = ({favorites, dispatch, loaded3}) => {
  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const response = await AuthServices.getFavorites();
      dispatch({
        type: SET_FAVORITES,
        payload: [...response.data.data],
      });
      dispatch({type: SET_LOADING_3, payload: false});
    } catch (error) {
      dispatch({type: SET_LOADING_3, payload: false});
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Mis canchas FAVORITAS</Text>
      {favorites.length > 0 && loaded3 === false ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={favorites}
          keyExtractor={(item) => item.court._id}
          renderItem={({item, index}) => (
            <MyReservationItem
              data={item}
              noMarginRight={index === favorites.length - 1 ? true : false}
            />
          )}
        />
      ) : null}
      {favorites.length === 0 && loaded3 === false ? (
        <Text
          style={{
            textAlign: 'center',
            ...Typography.fontTextNormal,
            color: Colors.colorGray2,
            fontSize: wp(3.8),
          }}>
          No tienes favoritos añadidos
        </Text>
      ) : null}
      {loaded3 !== false ? (
        <Text
          style={{
            textAlign: 'center',
            ...Typography.fontTextNormal,
            color: Colors.colorGray2,
            fontSize: wp(3.8),
          }}>
          Cargando...
        </Text>
      ) : null}
    </View>
  );
};

MyReservationList.propTypes = {
  favorites: PropTypes.array,
  loaded3: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {favorites} = state.auth;
  const {loaded3} = state.loading;

  return {
    favorites,
    loaded3,
  };
};

export default connect(mapStateToProps)(MyReservationList);

const styles = StyleSheet.create({
  container: {
    marginTop: wp(3),
  },
  textTitle: {
    ...Typography.fontTextNormal,
    color: Colors.colorGray2,
    ...Spacing.marginBottomXm,
  },
});
