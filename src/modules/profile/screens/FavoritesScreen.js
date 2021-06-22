import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, View, ScrollView, StatusBar} from 'react-native';
import Header from '../../../components/header/Header';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Layout, Colors, Typography, Spacing} from '../../../styles';

import IconBall from '../../../assets/svg/icons/ball2.svg';

import MyReservationItem from '../../initial/components/myreservation-item/MyReservationItem';

const FavoritesScreen = ({favorites}) => {
  return (
    <View style={{...Layout.screenWhite}}>
      <Header title="Mis Favoritos" />
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {favorites.length === 0 ? (
        <View
          style={{
            ...Layout.screenWhite,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: wp(1),
          }}>
          <View
            style={{
              alignItems: 'center',
              width: wp(80),
              ...Spacing.marginBottomLg,
            }}>
            <IconBall width={wp(25)} height={wp(25)} />
            <Text
              style={{
                ...Spacing.marginTopXm,
                textAlign: 'center',
                ...Typography.fontTextNormal,
                color: Colors.colorBlack,
                fontSize: wp(4.5),
              }}>
              ¡Tu lista de favoritos está vacía!
            </Text>
            <Text
              style={{
                ...Spacing.marginTopMd,
                textAlign: 'center',
                ...Typography.fontTextNormal,
                color: Colors.colorGray3,
                fontSize: wp(3.8),
              }}>
              Explore nuestras canchas y agregalas para poder verlas aquí
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView
          style={{
            paddingTop: wp(3.5),
            ...Spacing.paddingHorizontalSm,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: wp(4.5)}}>
            {favorites.map((f) => (
              <MyReservationItem
                key={f.court._id}
                data={f}
                noMarginRight={false}
                vertical={true}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

FavoritesScreen.propTypes = {
  favorites: PropTypes.array,
};

const mapStateToProps = (state) => {
  const {favorites} = state.auth;

  return {
    favorites,
  };
};

export default connect(mapStateToProps)(FavoritesScreen);
