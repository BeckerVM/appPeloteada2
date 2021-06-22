import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

const ListDays = ({filterDays, setFilterDays}) => {
  const changeSelectedDay = (id) => {
    const updateFilterDays = filterDays.map((filterDay) => {
      if (id === filterDay.id) {
        return {
          ...filterDay,
          selected: true,
        };
      }

      return {
        ...filterDay,
        selected: false,
      };
    });

    setFilterDays([...updateFilterDays]);
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      style={styles.list}
      horizontal
      data={filterDays}
      keyExtractor={(item) => item.id}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() => changeSelectedDay(item.id)}
          style={[
            styles.btnDay,
            item.selected ? {backgroundColor: Colors.colorPrimary} : null,
            index === filterDays.length - 1 ? {marginRight: 0} : null,
          ]}>
          <Text
            style={[
              styles.text,
              item.selected ? {color: Colors.colorWhite} : null,
            ]}>
            {item.dayD.toUpperCase()}
          </Text>
          <Text
            style={[
              styles.text,
              {...Typography.fontTextNormal, fontSize: wp(3)},
              item.selected ? {color: Colors.colorWhite} : null,
            ]}>
            {item.dayN}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

ListDays.propTypes = {
  filterDays: PropTypes.array,
  setFilterDays: PropTypes.func,
};

export default ListDays;

const styles = StyleSheet.create({
  list: {
    ...Spacing.paddingVerticalXm,
    maxHeight: wp(20),
    marginTop: wp(1),
  },
  btnDay: {
    borderRadius: wp(2),
    width: wp(15),
    height: wp(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.colorGray,
    borderWidth: wp(0.1),
    ...Spacing.marginRightXm,
  },
  text: {
    ...Typography.fontTextNormal,
    color: Colors.colorBlack,
  },
});
