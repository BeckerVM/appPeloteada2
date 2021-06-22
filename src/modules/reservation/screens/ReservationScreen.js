import React from 'react';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {useFilterReservation} from '../hooks/useFilterReservation';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Spacing, Typography} from '../../../styles';

import ReservationFilterContainer from '../components/reservation-filter-container/ReservationFilterContainer';
import ReservationModalFilter from '../components/reservation-modal-filter/ReservationModalFilter';
import IconCalendar from '../../../assets/svg/icons/ball2.svg';
import ListField from '../components/list-field/ListField';

import {getBusinessWithFields} from '../../../redux/actions/reservationActions';

const ReservationScreen = ({dispatch, business, loaded}) => {
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
    filterModalDays, setFilterModalDays
  } = useFilterReservation(dispatch, getBusinessWithFields);

  return (
    <View
      style={{
        backgroundColor: Colors.colorWhite,
        flex: 1,
        ...Spacing.paddingTopStatusBar,
      }}>
      <ReservationFilterContainer
        selectedDate={selectedDate}
        rentalHour={rentalHour}
        filterHours={filterHours}
        currentDate={currentDate}
        setModalOpened={setModalOpened}
        setSelectedDate={setSelectedDate}
      />

      {loaded ? (
        <View style={{ top: wp(42), zIndex: 100, backgroundColor: 'rgba(255, 255, 255, 0.5)', position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../../../assets/animations/loading-ball2.json')}
            autoPlay
            loop
            style={{width: wp(40), height: wp(40), marginBottom: wp(30)}}
          />
        </View>
      ) : null}
      {business.length === 0 && loaded === false ? (
        <View style={styles.containerThereAreNot}>
          <IconCalendar width={wp(25)} height={wp(25)} />
          <Text style={styles.textThereAreNot}>
            No hay canchas disponibles, prueba cambiar el horario o la fecha
          </Text>
        </View>
      ) : null}
      {business.length > 0? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingTop: wp(2.5)}}>
          {business.map((b, index) => (
            <ListField key={b._id} data={b}  selectedDate={selectedDate} noMargin={business.length - 1 === index ? true : false} />
          ))}
        </ScrollView>
      ) : null}
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
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  containerThereAreNot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textThereAreNot: {
    textAlign: 'center',
    width: wp(80),
    ...Typography.fontTextNormal,
    fontSize: wp(3.8),
    ...Spacing.marginTopXm,
  },
});

ReservationScreen.propTypes = {
  business: PropTypes.array,
  loaded: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {business} = state.reservation;
  const {loaded} = state.loading;

  return {
    business,
    loaded,
  };
};

export default connect(mapStateToProps)(ReservationScreen);
