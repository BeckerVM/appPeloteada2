import React, {useEffect} from 'react';
import {useStatusBar} from '../../../hooks/useStatusBar';

import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, StatusBar, Text} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Spacing, Typography} from '../../../styles';

import Header from '../../../components/header/Header';
import IconBall from '../../../assets/svg/icons/ball2.svg';

import MyReservationList from '../components/mi-reservation-list/MyReservationList';

import {getMyReservations} from '../../../redux/actions/reservationActions';

const MyReservationsScreen = ({loaded2, dispatch, myReservations}) => {
  const {showBar} = useStatusBar();

  useEffect(() => {
    dispatch(getMyReservations());
  }, []);

  return (
    <View style={{backgroundColor: Colors.colorWhite, flex: 1}}>
      <Header title="Mis Reservas" />
      <StatusBar
        translucent={showBar}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.listContainer}>
        {loaded2 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              source={require('../../../assets/animations/player.json')}
              autoPlay
              loop
              style={{width: wp(40), height: wp(40)}}
            />
          </View>
        ) : null}
        {myReservations.length > 0 && loaded2 === false ? (
          <MyReservationList myReservations={myReservations} />
        ) : null}
        {myReservations.length === 0 && loaded2 === false ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <IconBall width={wp(25)} height={wp(25)} />
            <Text
              style={{
                ...Spacing.marginTopXm,
                textAlign: 'center',
                ...Typography.fontTextNormal,
                color: Colors.colorBlack,
                fontSize: wp(4),
              }}>
              ¡Tu lista de reservas está vacía!
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

MyReservationsScreen.propTypes = {
  loaded2: PropTypes.bool,
  myReservations: PropTypes.array,
};

const mapStateToProps = (state) => {
  const {loaded2} = state.loading;
  const {myReservations} = state.reservation;
  return {
    loaded2,
    myReservations,
  };
};

export default connect(mapStateToProps)(MyReservationsScreen);

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.colorWhite,
    flex: 1,
    paddingHorizontal: wp(3),
  },
});
