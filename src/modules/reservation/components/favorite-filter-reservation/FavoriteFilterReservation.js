import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';
import LottieView from 'lottie-react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ListDays from '../list-days/ListDays';
import ListFilterDate from '../list-filter-date/ListFilterDate';
import IconBall from '../../../../assets/svg/icons/ball2.svg';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors, Buttons} from '../../../../styles';

import reservationServices from '../../../../services/reservationServices';
import {SET_LOADING} from '../../../../redux/constants/loadingConstants';

const FavoriteFilterReservation = ({
  filterModalDays,
  currentDate,
  selectedDate,
  courtId,
  loaded,
  dispatch,
  data2,
}) => {
  const [filterDays, setFilterDays] = useState([]);
  const [filterHours, setFilterHours] = useState([]);
  const [freeField, setFreeField] = useState(false);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

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

  const [detail, setDetail] = useState({});
  const navigation = useNavigation()
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

  useEffect(() => {
    if (
      selectedDate.dayD !== '' &&
      currentDate.dayD !== '' &&
      filterModalDays.length > 0
    ) {
      let hourRange;
      let hourInitial;

      hourRange = (22 - currentDate.hour) / 1;
      hourInitial = 1 * currentDate.hour + 1;
      updateFilterHours(hourRange, hourInitial, selectedDate);
      setFilterDays([...filterModalDays]);
    }
  }, [currentDate, selectedDate, filterModalDays]);

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
    <View style={styles.container}>
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
      <TouchableOpacity
        onPress={() => {
          filterDays.forEach((f) => {
            if (f.selected) {
              filterHours.forEach((f2) => {
                if (f2.selected) {
                  rangeHours.forEach(async (f3) => {
                    if (f3.selected) {
                      const data = {
                        ...selectedDate,
                        ...f,
                        hourInitial: f2.valueText,
                        valueInitial: f2.value,
                        valueFinal:
                          f2.value + f3.value > 24 ? 24 : f2.value + f3.value,
                      };

                      const formatData = {
                        day: moment(
                          `${data.year.slice(0, 4)}-${data.monthN}-${
                            data.dayN
                          }`,
                          'YYYY-MM-DD',
                        ).format('YYYY/MM/DD'),
                        start: data.valueInitial,
                        end: data.valueFinal,
                        court: courtId,
                      };

                      dispatch({
                        type: SET_LOADING,
                        payload: true,
                      });
                      try {
                        const response = await reservationServices.getStatusFavoriteField(
                          formatData,
                        );
                        dispatch({
                          type: SET_LOADING,
                          payload: false,
                        });
                        if (response.data.data === false) {
                          setFreeField(true);
                          setMessage(
                            'Estado: Ocupado. La cancha no está disponible en la hora seleccionada, escoja otra hora para continuar.',
                          );
                          setDisabled(false);
                        } else {
                          setFreeField(true);
                          setMessage(
                            'Estado: Libre. La cancha está disponible en la hora seleccionada, presione continuar para ver el detalle.',
                          );
                          setDisabled(true);
                          setDetail({
                            idBusiness: data2.business._id,
                            _id: data2.court._id,
                            year: data.year + ',',
                            monthN: data.monthN,
                            dayN: data.dayN,
                            valueInitial: data.valueInitial,
                            valueFinal: data.valueFinal,
                            dayPrice: data2.court.dayPrice,
                            nightPrice: data2.court.nightPrice,
                            size: data2.court.size,
                            profileUrl: data2.court.profileUrl,
                            nameBusiness: data2.business.name,
                            name: data2.court.name,
                          });
                        }
                      } catch (error) {
                        dispatch({
                          type: SET_LOADING,
                          payload: false,
                        });
                        //console.log(error.response.data);
                      }
                    }
                  });
                }
              });
            }
          });
        }}
        style={{
          ...Buttons.buttonPrimary,
          alignSelf: 'center',
          ...Spacing.marginTopXm,
        }}>
        {!loaded ? (
          <Text
            style={{color: Colors.colorWhite, ...Typography.fontTextNormal}}>
            ¿Está libre?
          </Text>
        ) : (
          <LottieView
            style={{width: wp(20), height: wp(20)}}
            source={require('../../../../assets/animations/loading-1.json')}
            autoPlay
          />
        )}
      </TouchableOpacity>
      {freeField ? (
        <View style={{...Spacing.marginTopSm, alignItems: 'center'}}>
          <IconBall width={wp(15)} height={wp(15)} />
          <Text
            style={{
              ...Typography.fontTextNormal,
              width: wp(85),
              textAlign: 'center',
              ...Spacing.marginTopXm,
            
            }}>
            {message}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('ReservationDetail', {data: {
              ...detail
            }})}
            disabled={!disabled}
            style={[
              styles.btnContinue,
              !disabled
                ? {backgroundColor: Colors.colorGray2}
                : {backgroundColor: Colors.colorSecondary},
            ]}>
            <Text
              style={{...Typography.fontTextNormal, color: Colors.colorWhite}}>
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

FavoriteFilterReservation.propTypes = {
  currentDate: PropTypes.object,
  selectedDate: PropTypes.object,
  filterModalDays: PropTypes.array,
  courtId: PropTypes.string,
  loaded: PropTypes.bool,
  data2: PropTypes.object,
};

const mapStateToProps = (state) => {
  const {loaded} = state.loading;

  return {
    loaded,
  };
};

export default connect(mapStateToProps)(FavoriteFilterReservation);

const styles = StyleSheet.create({
  textTitle: {
    ...Typography.fontTextNormal,
    fontSize: wp(4.5),
  },
  container: {
    ...Spacing.paddingXm,
    paddingTop: wp(0)
  },
  btnContinue: {
    borderRadius: wp(2),
    width: wp(80),
    height: wp(13),
    backgroundColor: Colors.colorSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Spacing.marginTopSm,
  },
});
