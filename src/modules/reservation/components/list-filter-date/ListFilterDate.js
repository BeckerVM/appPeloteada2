import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, FlatList, TouchableOpacity, View} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';
import {fontTextNormal} from '../../../../styles/typography';

const ListFilterDate = ({title, data, setFilter}) => {
  const changeSelected = (id) => {
    const updateFilters = data.map((f) => {
      if (id === f.id) {
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

    setFilter(updateFilters);
  };

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => changeSelected(item.id)}
            style={[
              styles.btn,
              item.selected ? {backgroundColor: Colors.colorPrimary} : null,
              index === data.length - 1 ? {marginRight: 0} : null,
            ]}>
            <Text
              style={[
                styles.text,
                item.selected ? {color: Colors.colorWhite} : null,
              ]}>
              {item.valueText}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

ListFilterDate.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  setFilter: PropTypes.func,
};

export default ListFilterDate;

const styles = StyleSheet.create({
  list: {
    ...Spacing.paddingVerticalXm,
    maxHeight: wp(20),
  },
  title: {
    ...Typography.fontTextNormal,
    fontSize: wp(4.5),
  },
  text: {
    ...fontTextNormal,
    color: Colors.colorBlack,
  },
  btn: {
    borderRadius: wp(2),
    width: wp(30),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.colorGray,
    borderWidth: wp(0.1),
    ...Spacing.marginRightXm,
  },
});
