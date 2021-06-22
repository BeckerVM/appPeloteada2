import React from 'react';
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

import IconFavorite2 from '../../../../assets/svg/icons/favorite.svg';

import AuthServices from '../../../../services/authServices';

import {
  DELETE_FAVORITES,
} from '../../../../redux/constants/authConstants';

const MyReservationItem = ({noMarginRight, data, dispatch, vertical = false}) => {
  const navigation = useNavigation()

  const deleteFavorites = async () => {
    try {
      await AuthServices.deleteFavorites(data.court._id)
      dispatch({
        type: DELETE_FAVORITES,
        payload: data.court._id
      })
    } catch (error) {
    }
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('FavoriteReservation', {data})} style={[styles.container, noMarginRight ? {marginRight: 0} : null, vertical ? {width: '100%', ...Spacing.marginBottomXm} : null]}>
      <TouchableOpacity onPress={() => deleteFavorites()} style={{position: 'absolute', zIndex: 10, top: wp(24), right: wp(3)}}>
        <IconFavorite2 height={wp(10)} width={wp(10)} />
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={{
          uri: data.court.profileUrl,
        }}
      />
      <View style={styles.containerBottom}>
        <View>
          <Text
            style={{
              ...Typography.fontTextNormal,
              color: Colors.colorPrimary,
              ...Spacing.marginBottomXm,
              fontSize: wp(4)
            }}>
            {data.court.name} . {data.business.name}
          </Text>
        </View>
        <View style={styles.containerText2}>
          <Text
            style={[
              styles.textInfo,
              {
                width: wp(60),
              },
            ]}>
            Precio Diurno: S/.{data.court.dayPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.containerText2}>
          <Text style={styles.textInfo}>
            Precio Nocturno: S/.{data.court.nightPrice.toFixed(2)}
          </Text>
        </View>

        <View style={styles.containerText2}>
          <Text style={styles.textInfo}>
            Tamaño: {data.court.size} x {data.court.size}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

MyReservationItem.propTypes = {
  noMarginRight: PropTypes.bool,
  data: PropTypes.object,
  vertical: PropTypes.bool
};

export default connect()(MyReservationItem);

const styles = StyleSheet.create({
  container: {
    width: wp(70),
    position: 'relative',
    borderRadius: wp(1.5),
    ...Spacing.marginRightXm,
    borderTopEndRadius: wp(1.5),
    borderTopStartRadius: wp(1.5),
    borderWidth: wp(0.2),
    borderColor: Colors.colorGray,
  },
  image: {
    width: '100%',
    height: wp(30),
    resizeMode: 'cover',
    borderTopRightRadius: wp(1.5),
    borderTopLeftRadius: wp(1.5),
  },
  textInfo: {
    ...Typography.fontTextNormal,
  },
  containerText2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBottom: {
    padding: wp(2),
  },
});
