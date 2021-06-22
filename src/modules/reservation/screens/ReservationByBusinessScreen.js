import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import LottieView from 'lottie-react-native';

import {useFilterReservation} from '../hooks/useFilterReservation';

import ReservationFilterContainer from '../components/reservation-filter-container/ReservationFilterContainer';
import ReservationModalFilter from '../components/reservation-modal-filter/ReservationModalFilter';
import ListFieldByBusiness from '../components/list-field-by-business/ListFieldByBusiness';
import IconCalendar from '../../../assets/svg/icons/ball2.svg';

import {getFieldsInBusiness} from '../../../redux/actions/reservationActions';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography} from '../../../styles';

const ReservationByBusinessScreen = ({loaded2, dispatch, idBusiness, fieldsByBusiness, nameBusiness}) => {
  const {
    modalOpened,
    setModalOpened,
    currentDate,
    rentalHour,
    setRentalHour,
    sport,
    selectedDate,
    setSelectedDate,
    filterHours,
    setFilterHours,
    updateDate2,
    filterModalDays,
    setFilterModalDays,
  } = useFilterReservation(dispatch, getFieldsInBusiness, idBusiness);

  return (
    <>
      <ReservationFilterContainer
        selectedDate={selectedDate}
        rentalHour={rentalHour}
        filterHours={filterHours}
        currentDate={currentDate}
        setModalOpened={setModalOpened}
        setSelectedDate={setSelectedDate}
      />
      {loaded2 ? (
        <View style={{ top: wp(32), zIndex: 100, backgroundColor: 'rgba(255, 255, 255, 0.5)', position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../../../assets/animations/loading-ball2.json')}
            autoPlay
            loop
            style={{width: wp(40), height: wp(40), marginBottom: wp(40)}}
          />
        </View>
      ) : null}
      {
        fieldsByBusiness.length === 0 && loaded2 === false ? (
          <View style={styles.containerThereAreNot}>
            <IconCalendar width={wp(25)} height={wp(25)} />
            <Text style={styles.textThereAreNot}>
              No hay canchas disponibles, prueba cambiar el horario o la fecha
            </Text>
          </View>
        ) : null
      }
      {
        fieldsByBusiness.length > 0 ? (
          <ListFieldByBusiness
            selectedDate={selectedDate}
            fieldsByBusiness={fieldsByBusiness}
            idBusiness={idBusiness}
            nameBusiness={nameBusiness}
          />
        ) : null
      }
      {modalOpened ? (
        <ReservationModalFilter
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          currentDate={currentDate}
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          rentalHour={rentalHour}
          setRentalHour={setRentalHour}
          setMainFilterHours={setFilterHours}
          updateDate={updateDate2}
          filterModalDays2={filterModalDays}
          setFilterModalDays2={setFilterModalDays}
          itIsOpenInBusinessScreen={true}
        />
      ) : null}
    </>
  );
};
ReservationByBusinessScreen.propTypes = {
  business: PropTypes.array,
  loaded2: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {loaded2} = state.loading;
  const {fieldsByBusiness} = state.reservation;

  return {
    loaded2,
    fieldsByBusiness
  };
};

export default connect(mapStateToProps)(ReservationByBusinessScreen);

const styles = StyleSheet.create({
  containerThereAreNot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textThereAreNot: {
    textAlign: 'center',
    width: wp(80),
    ...Typography.fontTextNormal,
    fontSize: wp(3.8),
    ...Spacing.marginTopXm,
  },
});
