import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';

import MyReservationItem from '../mi-reservation-item/MyReservationItem';

const MyReservationList = ({myReservations}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={myReservations}
      keyExtractor={(item) => item._id}
      renderItem={({item, index}) => (
        <MyReservationItem data={item} index={index} />
      )}
    />
  );
};

MyReservationList.propTypes = {
  myReservations: PropTypes.array,
};

export default MyReservationList;
