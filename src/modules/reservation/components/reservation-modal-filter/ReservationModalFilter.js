import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

import IconClose from '../../../../assets/svg/icons/close.svg';
import ListDays from '../list-days/ListDays';
import ListFilterDate from '../list-filter-date/ListFilterDate';
import FilterSize from '../filter-size/FilterSize';

const ReservationModalFilter = ({
  modalOpened,
  setModalOpened,
  filterModalDays2,
  setFilterModalDays2,
  currentDate,
  setSelectedDate,
  selectedDate,
  rentalHour,
  setRentalHour,
  setMainFilterHours,
  updateDate,
  itIsOpenInBusinessScreen = false
}) => {
  const [filterDays, setFilterDays] = useState([...filterModalDays2]);
  const [filterHours, setFilterHours] = useState([]);
  const [rangeHours, setRangeHours] = useState([
    {id: '1', valueText: '1 Hor.', value: 1, selected: true, valueMin: 60},
    {
      id: '2',
      valueText: '1:30 Hor.',
      value: 1.5,
      selected: false,
      valueMin: 90,
    },
    {id: '3', valueText: '2 Hor.', value: 2, selected: false, valueMin: 120},
    {
      id: '4',
      valueText: '2:30 Hor.',
      value: 2.5,
      selected: false,
      valueMin: 150,
    },
    {id: '5', valueText: '3 Hor.', value: 3, selected: false, valueMin: 180},
  ]);

  const [filterSize, setFilterSize] = useState([
    {id: 1, value: 5, valueDescription: '5 x 5', selected: false},
    {id: 2, value: 6, valueDescription: '6 x 6', selected: false},
    {id: 3, value: 7, valueDescription: '7 x 7', selected: false},
    {id: 4, value: 8, valueDescription: '8 x 8', selected: false},
    {id: 5, value: 9, valueDescription: '9 x 9', selected: false},
    {id: 6, value: 10, valueDescription: '10 x 10', selected: false},
    {id: 7, value: 11, valueDescription: '11 x 11', selected: false},
    {id: 8, value: 0, valueDescription: 'Todos', selected: true},
  ]);

  useEffect(() => {
    let hourRange;
    let hourInitial;
    if (currentDate.dayN !== selectedDate.dayN) {
      hourRange = 17;
      hourInitial = 6;
      updateFilterHours(hourRange, hourInitial, selectedDate);
    } else {
      hourRange = (22 - currentDate.hour) / 1;
      hourInitial = 1 * currentDate.hour + 1;
      updateFilterHours(hourRange, hourInitial, selectedDate);
    }

    const updateRangeHours = rangeHours.map((h) => {
      if (h.value === rentalHour) {
        return {
          ...h,
          selected: true,
        };
      } else {
        return {
          ...h,
          selected: false,
        };
      }
    });

    const updateFilterSize = filterSize.map((f) => {
      if (f.value === selectedDate.valueSize) {
        return {
          ...f,
          selected: true,
        };
      } else {
        return {
          ...f,
          selected: false,
        };
      }
    });

    setRangeHours([...updateRangeHours]);
    setFilterSize([...updateFilterSize]);
  }, []);

  useEffect(() => {
    if (filterHours.length > 0) {
      let selectHour = {
        valueInitial: filterHours.filter((f) => f.selected === true)[0].value,
      };
      let hourRange;
      let hourInitial;

      filterDays.forEach((f) => {
        if (f.selected) {
          if (currentDate.dayN !== f.dayN) {
            hourRange = 17;
            hourInitial = 6;
            updateFilterHours(hourRange, hourInitial, selectHour);
          } else {
            hourRange = (22 - currentDate.hour) / 1;
            hourInitial = 1 * currentDate.hour + 1;
            updateFilterHours(
              hourRange,
              hourInitial,
              1 * currentDate.hour + 1 < selectHour.valueInitial
                ? selectHour
                : {valueInitial: currentDate.hour * 1 + 1},
            );
          }
        }
      });
    }
  }, [filterDays]);

  const updateFilterHours = (hourRange, hourInitial, selected) => {
    const filters = [];

    for (let i = 0; i <= hourRange * 2; i++) {
      filters.push({
        value: hourInitial,
        id: i.toString(),
        valueText: '',
        selected: selected.valueInitial === hourInitial ? true : false,
      });

      hourInitial = hourInitial + 0.5;

      filters[i].valueText = filters[i].value.toString().includes('.5')
        ? filters[i].value.toString().replace('.5', ':30')
        : filters[i].value.toString() + ':00';
    }

    setFilterHours([...filters]);
  };

  return (
    <Modal
      style={styles.container}
      visible={modalOpened}
      animationType="fade"
      onRequestClose={() => setModalOpened(false)}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => setModalOpened(false)}>
          <IconClose width={wp(12)} height={wp(12)} />
        </TouchableOpacity>
        <Text style={styles.textTitle}>¿Cuándo jugamos?</Text>
        <ListDays filterDays={filterDays} setFilterDays={setFilterDays} />
        <ListFilterDate
          title="Hora"
          data={filterHours}
          setFilter={(f) => {
            setFilterHours([...f]);
          }}
        />
        <ListFilterDate
          title="Tiempo"
          data={rangeHours}
          setFilter={(f) => {
            setRangeHours([...f]);
          }}
        />
        <View style={styles.containerBottom}>
          <FilterSize filterSize={filterSize} setFilterSize={setFilterSize}  itIsOpenInBusinessScreen={itIsOpenInBusinessScreen} />
          <TouchableOpacity
            style={styles.btnSave}
            onPress={() => {
              setFilterModalDays2([...filterDays])

              filterDays.forEach((f) => {
                if (f.selected) {
                  filterHours.forEach((f2) => {
                    if (f2.selected) {
                      rangeHours.forEach((f3) => {
                        if (f3.selected) {
                          filterSize.forEach((f4) => {
                            if (f4.selected) {
                              setSelectedDate({
                                ...selectedDate,
                                ...f,
                                hourInitial: f2.valueText,
                                valueInitial: f2.value,
                                valueFinal:
                                  f2.value + f3.value > 24
                                    ? 24
                                    : f2.value + f3.value,
                                valueSize: f4.value,
                              });
                              
                              setRentalHour(f3.value);

                              const filters = [...updateDate(f2.value, f3.value)]

                              setMainFilterHours([...filters])
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
              setModalOpened(false);
            }}>
            <Text
              style={{
                ...Typography.fontTextNormal,
                color: Colors.colorWhite,
              }}>
              Buscar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

ReservationModalFilter.propTypes = {
  modalOpened: PropTypes.bool,
  setModalOpened: PropTypes.func,
  currentDate: PropTypes.object,
  setSelectedDate: PropTypes.func,
  selectedDate: PropTypes.object,
  rentalHour: PropTypes.number,
  setRentalHour: PropTypes.func,
  setMainFilterHours: PropTypes.func,
  updateDate: PropTypes.func,
  itIsOpenInBusinessScreen: PropTypes.bool
};

export default ReservationModalFilter;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
    ...Spacing.paddingHorizontalSm,
  },
  btnClose: {
    position: 'absolute',
    top: wp(1),
    left: wp(4),
  },
  textTitle: {
    ...Typography.fontTextNormal,
    fontSize: wp(6.5),
    marginTop: wp(10),
  },
  containerBottom: {
    flex: 1,
    justifyContent: 'space-between',
  },
  btnSave: {
    backgroundColor: Colors.colorSecondary,
    width: wp(80),
    alignSelf: 'center',
    height: wp(13),
    marginBottom: wp(2),
    borderRadius: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
