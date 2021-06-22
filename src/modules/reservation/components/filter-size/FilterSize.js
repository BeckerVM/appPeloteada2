import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

import IconBall from '../../../../assets/svg/icons/ball-filter.svg';

const FilterSize = ({filterSize, setFilterSize, itIsOpenInBusinessScreen}) => {
  const changeFilterSize = (id) => {
    if (!itIsOpenInBusinessScreen) {
      const update = filterSize.map((f) => {
        if (f.id === id) {
          return {
            ...f,
            selected: true,
          };
        }
        return {
          ...f,
          selected: false,
        };
      });

      setFilterSize([...update]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tamaño</Text>
      <View style={styles.containerSize}>
        {filterSize.map((item, index) => (
          <View key={item.id} style={styles.containerItem}>
            <TouchableOpacity
              onPress={() => changeFilterSize(item.id)}
              style={{
                width: wp(14),
                height: wp(14),
                borderRadius: wp(100),
                borderWidth: wp(0.2),
                borderColor: Colors.colorGray,
              }}>
              {item.selected ? (
                <IconBall width={wp(14)} height={wp(14)} />
              ) : null}
            </TouchableOpacity>
            <Text style={{...Typography.fontTextNormal}}>
              {item.valueDescription}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

FilterSize.propTypes = {
  filterSize: PropTypes.array,
  setFilterSize: PropTypes.func,
  itIsOpenInBusinessScreen: PropTypes.bool,
};

export default FilterSize;

const styles = StyleSheet.create({
  title: {
    ...Typography.fontTextNormal,
    fontSize: wp(4.5),
    ...Spacing.marginBottomSm,
  },
  containerSize: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  containerItem: {
    width: wp(20),
    height: wp(20),
    alignItems: 'center',
    marginBottom: wp(2),
  },
});
