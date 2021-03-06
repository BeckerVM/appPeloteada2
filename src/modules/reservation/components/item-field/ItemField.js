import React from 'react';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Typography, Colors} from '../../../../styles';

import IconBall from '../../../../assets/svg/icons/ball-min.svg';
import IconFavorite from '../../../../assets/svg/icons/favorite2.svg';
import IconFavorite2 from '../../../../assets/svg/icons/favorite.svg';
import IconMoon from '../../../../assets/svg/icons/moon.svg';
import IconSun from '../../../../assets/svg/icons/sun.svg';

import AuthServices from '../../../../services/authServices';

import {
  ADD_FAVORITES,
  DELETE_FAVORITES,
} from '../../../../redux/constants/authConstants';

const ItemField = ({
  data,
  selectedDate,
  nameBusiness,
  idBusiness,
  noMargin = false,
  favorites,
  dispatch,
  resize = false
}) => {
  const navigation = useNavigation();
  const [disabled, setDisabled] = React.useState(false);

  const addToFavorites = async () => {
    setDisabled(true);
    try {
      await AuthServices.addToFavorites(data._id, idBusiness);
      dispatch({
        type: ADD_FAVORITES,
        payload: {
          court: {
            _id: data._id,
            name: data.name,
            size: data.size,
            profileUrl: data.profileUrl,
            dayPrice: data.dayPrice,
            nightPrice: data.nightPrice,
            discount: data.discount
          },
          business: {
            _id: idBusiness,
            name: nameBusiness,
          },
        },
      });
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
    }
  };

  const deleteFavorites = async () => {
    try {
      await AuthServices.deleteFavorites(data._id);
      dispatch({
        type: DELETE_FAVORITES,
        payload: data._id,
      });
    } catch (error) {
    }
  };

  return (
    <View
      style={[styles.container, noMargin === true ? {marginRight: 0} : null]}>
      {favorites.find((f) => f.court._id === data._id) == undefined ? (
        <TouchableOpacity
          disabled={disabled}
          onPress={() => addToFavorites()}
          style={{position: 'absolute', zIndex: 10, top: wp(4), right: wp(2)}}>
          <IconFavorite height={wp(8)} width={wp(8)} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          onPress={() => deleteFavorites()}
          style={{position: 'absolute', zIndex: 10, top: wp(4), right: wp(2)}}>
          <IconFavorite2 height={wp(8)} width={wp(8)} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('ReservationDetail', {
            data: {
              idBusiness,
              nameBusiness,
              ...data,
              ...selectedDate,
              discountDayPrice:
                data.dayPrice - (data.dayPrice / 100) * data.discount,
              discountNightPrice:
                data.nightPrice - (data.nightPrice / 100) * data.discount,
            },
          })
        }>
        <ImageBackground
          style={[styles.fieldContainer, resize ? { width: wp(90), height: wp(48)} : null]}
          source={{
            uri: data.profileUrl,
          }}>
          {data.isAvailable ? (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, .4)',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text style={styles.textDiscount}>{data.discount}% OFF</Text>
              <Text style={styles.textInfo}>{data.name}</Text>
              <Text style={styles.textInfo}>
                <IconBall width={wp(4)} height={wp(4)} /> {data.size} vs{' '}
                {data.size}
              </Text>
              <View style={styles.contentPrice}>
                <View
                  style={{
                    backgroundColor: Colors.colorWhite,
                    borderBottomLeftRadius: wp(2),
                    borderTopLeftRadius: wp(2),
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <IconSun width={wp(5)} height={wp(5)} />
                  <View style={styles.containerPrice2}>
                    <Text
                      style={[
                        {
                          ...Typography.fontTextNormal,
                          textDecorationLine: 'line-through',
                          textDecorationStyle: 'solid',
                          color: Colors.colorGray2,
                        },
                      ]}>
                      S/. {data.dayPrice.toFixed(2)}{' '}
                    </Text>
                    <Text
                      style={[
                        {...Typography.fontTextNormal, fontSize: wp(2.5)},
                      ]}>
                      S/.{' '}
                      {(
                        data.dayPrice -
                        (data.dayPrice / 100) * data.discount
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: Colors.colorPrimary,
                    borderBottomRightRadius: wp(2),
                    borderTopRightRadius: wp(2),
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <IconMoon width={wp(4)} height={wp(4)} />
                  <View style={styles.containerPrice2}>
                    <Text
                      style={[
                        {
                          ...Typography.fontTextNormal,
                          textDecorationLine: 'line-through',
                          textDecorationStyle: 'solid',
                          color: Colors.colorWhite,
                        },
                      ]}>
                      S/. {data.nightPrice.toFixed(2)}{' '}
                    </Text>
                    <Text
                      style={[
                        {
                          ...Typography.fontTextNormal,
                          color: Colors.colorWhite,
                          fontSize: wp(2.5),
                        },
                      ]}>
                      S/.{' '}
                      {(
                        data.nightPrice -
                        (data.nightPrice / 100) * data.discount
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
        </ImageBackground>
      </TouchableOpacity>
      {data.isAvailable === false ? (
        <View style={styles.backContainer}>
          <Text style={styles.textInfo}>{data.name}</Text>
          <Text style={styles.textInfo}>
            <IconBall width={wp(4)} height={wp(4)} /> {data.size} vs {data.size}
          </Text>
          <Text
            style={[
              styles.textInfo,
              {
                backgroundColor: Colors.colorGray2,
                width: wp(36),
                borderRadius: wp(2),
                paddingVertical: wp(1),
                paddingRight: wp(0.5),
                marginTop: wp(1),
              },
            ]}>
            No disponible
          </Text>
        </View>
      ) : null}
    </View>
  );
};

ItemField.propTypes = {
  noMarginRight: PropTypes.bool,
  data: PropTypes.object,
  nameBusiness: PropTypes.string,
  selectedDate: PropTypes.object,
  noMargin: PropTypes.bool,
  favorites: PropTypes.array,
};

const mapStateToProps = (state) => {
  const {favorites} = state.auth;

  return {
    favorites,
  };
};

export default connect(mapStateToProps)(ItemField);

const styles = StyleSheet.create({
  container: {
    paddingTop: wp(2),
    position: 'relative',
    marginRight: wp(1),
  },
  fieldContainer: {
    width: wp(65),
    height: wp(40),
    position: 'relative',
    borderRadius: wp(1.5),
    resizeMode: 'cover',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backContainer: {
    position: 'absolute',
    borderRadius: wp(1.5),
    top: wp(2),
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(191, 191, 191, .9)',
    zIndex: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    color: Colors.colorWhite,
    textAlign: 'center',
    ...Typography.fontTextNormal,
    fontSize: wp(3.5),
  },
  textDiscount: {
    backgroundColor: Colors.colorSecondary,
    color: Colors.colorWhite,
    padding: wp(1),
    paddingHorizontal: wp(3),
    ...Typography.fontTextNormal,
    position: 'absolute',
    top: wp(2.8),
    left: 0,
    borderBottomRightRadius: wp(2),
    borderTopRightRadius: wp(2),
  },
  contentPrice: {
    width: '90%',
    flexDirection: 'row',
    marginTop: wp(5),
  },
  containerPrice2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(1),
  },
  textPrice: {
    ...Typography.fontTextNormal,
  },
});
