import React from 'react';
import {View, StatusBar} from 'react-native';
import {useStatusBar} from '../../../hooks/useStatusBar';
import {useFilterReservation} from '../hooks/useFilterFavoriteReservation';
import Header from '../../../components/header/Header';

import {Layout} from '../../../styles';

import FavoriteFilterReservation from '../components/favorite-filter-reservation/FavoriteFilterReservation';

const FavoriteReservationScreen = ({route}) => {
  const {currentDate, filterModalDays, selectedDate} = useFilterReservation();
  const {data, discountDayPrice, discountNightPrice, discount} = route.params;
  const {showBar} = useStatusBar();

  return (
    <View style={{...Layout.screenWhite}}>
      {showBar ? (
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
      ) : null}
      <Header title={data.business.name + ' . ' + data.court.name} />
      <FavoriteFilterReservation
        currentDate={currentDate}
        filterModalDays={filterModalDays}
        selectedDate={selectedDate}
        courtId={data.court._id}
        data2={data}
        discountDayPrice={discountDayPrice}
        discountNightPrice={discountNightPrice}
        discount={discount}
      />
    </View>
  );
};

export default FavoriteReservationScreen;
