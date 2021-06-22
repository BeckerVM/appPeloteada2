import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {BoxShadow} from 'react-native-shadow';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

const shadowOpt = {
  width: wp(100),
  height: wp(34.5),
  color: Colors.colorBlack,
  border: 0.5,
  radius: 1,
  opacity: 0.3,
  x: 0,
  y: 0.5,
};

const ReservationFilterContainer = ({
  rentalHour,
  filterHours,
  currentDate,
  setModalOpened,
  selectedDate,
  setSelectedDate,
}) => {
  const [refFlatList, setrefFlatList] = useState(null);

  useEffect(() => {
    filterHours.forEach((f, index) => {
      if (f.initial === selectedDate.hourInitial) {
        if (refFlatList !== null) {
          refFlatList.scrollToIndex({animated: false, index: index});
        }
      }
    });
  }, [refFlatList]);

  const changeSelectHour = (item) => {
    setSelectedDate({
      ...selectedDate,
      valueInitial: item.valueInitial,
      valueFinal: item.valueFinal,
      hourInitial: item.initial,
    });
  };

  return (
    <BoxShadow setting={shadowOpt}>
      <View style={styles.container}>
        <View style={styles.containerButtonDate}>
          <TouchableOpacity
            style={styles.buttonDate}
            onPress={() => setModalOpened(true)}>
            <Text
              style={{
                ...Typography.fontTextNormal,
                fontSize: wp(3.8),
                color: Colors.colorBlack,
                textAlign: 'center',
              }}>
              {selectedDate.dayN === currentDate.dayN ? 'HOY' + ' . ' : null}
              {1 * selectedDate.dayN - 1 * currentDate.dayN === 1
                ? 'MAÑANA' + ' . '
                : null}
              {1 * selectedDate.dayN - 1 * currentDate.dayN > 1 ||
              selectedDate.month !== currentDate.month
                ? `${selectedDate.dayD.toUpperCase()} ${
                    selectedDate.dayN
                  } DE ${selectedDate.month.toUpperCase()} . `
                : null}
              {rentalHour.toString().includes('.5')
                ? rentalHour.toString().replace('.5', ':30')
                : rentalHour.toString()}{' '}
              HORA{rentalHour > 1 ? 'S' : null} . FUTBOL
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          getItemLayout={(data, index) => {
            return {
              length: wp(29.4) + wp(0.1) + wp(2),
              offset: (wp(29.4) + wp(0.1) + wp(2)) * index,
              index,
            };
          }}
          ref={(ref) => setrefFlatList(ref)}
          style={styles.list}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={filterHours}
          keyExtractor={(item) => item.initial.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => changeSelectHour(item)}
              disabled={
                currentDate.dayN !== selectedDate.dayN
                  ? false
                  : parseFloat(item.initial) <= currentDate.hour
                  ? true
                  : false
              }
              style={[
                styles.listButton,
                index === filterHours.length - 1 ? {marginRight: wp(8)} : null,
                item.initial === selectedDate.hourInitial
                  ? {backgroundColor: Colors.colorPrimary}
                  : null,
                currentDate.dayN !== selectedDate.dayN
                  ? false
                  : parseFloat(item.initial) <= currentDate.hour
                  ? {backgroundColor: Colors.colorGray}
                  : null,
              ]}>
              <Text
                style={[
                  {...Typography.fontTextNormal, color: Colors.colorGray2},
                  item.initial === selectedDate.hourInitial
                    ? {color: Colors.colorWhite}
                    : null,
                ]}>
                {item.initial} - {item.final}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </BoxShadow>
  );
};

ReservationFilterContainer.propTypes = {
  idFilterSelected: PropTypes.number,
  rentalHour: PropTypes.number,
  filterHours: PropTypes.array,
  currentDate: PropTypes.object,
  setModalOpened: PropTypes.func,
  selectedDate: PropTypes.object,
  setSelectedDate: PropTypes.func,
};

export default connect()(ReservationFilterContainer);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorWhite,
    paddingTop: wp(1.5),
    height: wp(34.5),
  },
  containerButtonDate: {
    ...Spacing.paddingHorizontalSm,
    ...Spacing.marginTopXm,
  },
  buttonDate: {
    borderWidth: wp(0.1),
    borderColor: Colors.colorGray2,
    borderRadius: wp(2),
    height: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingTop: wp(3),
    paddingLeft: wp(4),
  },
  listButton: {
    height: wp(12),
    width: wp(29.4),
    ...Spacing.marginRightXm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    borderWidth: wp(0.1),
    borderColor: Colors.colorGray2,
  },
});
