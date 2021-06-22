import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import {PhoneSchema} from './validations';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

import IconAlert from '../../../../assets/svg/icons/alert.svg';
import reservationServices from '../../../../services/reservationServices';

import {SET_LOADING} from '../../../../redux/constants/loadingConstants';

const FormNumber = ({detail, loaded, dispatch}) => {
  const navigation = useNavigation();

  const saveReservation = async (phone) => {
    const data = {
      business: detail.businessId,
      court: detail.fieldId,
      phone: phone,
      day: detail.date,
      hour: detail.valueInitial,
      time: (detail.valueFinal - detail.valueInitial) * 60,
      total: detail.totalPrice,
    };

    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      await reservationServices.saveReservation(data);
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'ReservationMessage'}],
      });
    } catch (error) {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      showAlertFail(error.response.data.message);
    }
  };

  const showAlertFail = (message) => {
    Alert.alert('Upss', message, [{text: 'OK'}]);
  };

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Necesitamos tu número</Text>
      <Text style={styles.textContent}>
        Para que el local pueda comunicarse contigo
      </Text>
      <Formik
        initialValues={{phone: ''}}
        validationSchema={PhoneSchema}
        onSubmit={async ({phone}) => {
          const currentDate = moment()
            .locale('es')
            .format('YYYY-MM-DD H')
            .split(' ');

          if (currentDate[0] === detail.date) {
            if (parseFloat(detail.valueInitial - currentDate[1]) < 2) {
              showAlertFail(
                'La hora reservada no puede ser tan próxima a la actual.',
              );
            } else {
              saveReservation(phone);
            }
          } else {
            saveReservation(phone);
          }
        }}>
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View style={styles.form}>
            <View style={styles.containerInputs}>
              <View style={[styles.containerInput]}>
                <TextInput
                  style={[
                    styles.textInput,
                    (errors.phone && touched.phone) === true
                      ? styles.errorInput
                      : null,
                  ]}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                {errors.phone && touched.phone ? (
                  <Text
                    style={{
                      marginLeft: wp(0.5),
                      color: 'crimson',
                      ...Typography.fontTextNormal,
                      fontSize: wp(3),
                    }}>
                    {errors.phone}
                  </Text>
                ) : null}
              </View>
            </View>
            <View>
              <View>
                <View style={styles.alert}>
                  <IconAlert />
                  <Text style={styles.alertText}>
                    En caso del uso de los reflectores se le añadirá un costo
                    adicional impuesto por el local.
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid ? true : false}
                style={[
                  styles.btn,
                  !isValid ? {backgroundColor: Colors.colorGray2} : null,
                ]}>
                {!loaded ? (
                  <Text style={[styles.text]}>Reservar</Text>
                ) : (
                  <LottieView
                    style={{width: wp(20), height: wp(20)}}
                    source={require('../../../../assets/animations/loading-1.json')}
                    autoPlay
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

FormNumber.propTypes = {
  detail: PropTypes.object,
  loaded: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {loaded} = state.loading;

  return {
    loaded,
  };
};

export default connect(mapStateToProps)(FormNumber);

const styles = StyleSheet.create({
  title: {
    color: Colors.colorPrimary,
    ...Typography.fontTextNormal,
    fontSize: wp(4.5),
    textAlign: 'center',
  },
  textContent: {
    ...Typography.fontTextNormal,
    textAlign: 'center',
  },
  textInput: {
    textAlign: 'center',
    borderWidth: wp(0.3),
    borderColor: Colors.colorGray,
    padding: wp(1),
    paddingHorizontal: wp(2.5),
    borderRadius: wp(2),
    ...Spacing.marginTopSm,
    ...Typography.fontTextNormal,
  },
  btn: {
    backgroundColor: Colors.colorSecondary,
    width: wp(80),
    height: wp(12),
    alignSelf: 'center',
    padding: wp(2),
    alignItems: 'center',
    borderRadius: wp(2),
    justifyContent: 'center',
  },
  text: {
    color: Colors.colorWhite,
    ...Typography.fontTextNormal,
    fontSize: wp(4, 5),
  },
  alertText: {
    ...Typography.fontTextNormal,
    marginLeft: wp(2),
    width: wp(60),
    height: wp(18),
    textAlign: 'justify',
    fontSize: wp(3.4),
  },
  alert: {
    flexDirection: 'row',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  errorInput: {
    borderColor: 'crimson',
  },
});
