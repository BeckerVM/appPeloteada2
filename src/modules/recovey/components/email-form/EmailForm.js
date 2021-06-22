import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import LottieView from 'lottie-react-native';
import {useEmailForm} from './hook';
import {EmailSchema} from './validations'

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Spacing, Typography, Buttons} from '../../../../styles';

const EmailForm = ({dispatch, loaded}) => {
  const navigation = useNavigation()
  const {handleSubmit} = useEmailForm(dispatch, navigation)

  return (
    <View>
      <Formik initialValues={{email: ''}} onSubmit={handleSubmit} validationSchema={EmailSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={styles.containerForm}>
            <View style={styles.containerInputs}>
              <View style={[styles.containerInput]}>
                <Text style={styles.textLabel}>Correo Electrónico</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    (errors.email && touched.email) === true
                      ? styles.errorInput
                      : null,
                  ]}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              disabled={!isValid}
              onPress={handleSubmit}
              style={[
                styles.btnForm,
                !isValid === true ? styles.isInvalid : null,
              ]}>
              {!loaded ? (
                <Text
                  style={[
                    styles.textForm,
                    !isValid === true ? styles.textInvalid : null,
                  ]}>
                  Enviar
                </Text>
              ) : (
                <LottieView
                  style={{width: wp(20), height: wp(20)}}
                  source={require('../../../../assets/animations/loading-1.json')}
                  autoPlay
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

EmailForm.propTypes = {
  loaded: PropTypes.bool
}


const mapStateToProps = state => {
  const {loaded} = state.loading

  return {
    loaded
  }
}

export default connect(mapStateToProps)(EmailForm);

const styles = StyleSheet.create({
  containerForm: {
    width: wp(90),
    alignSelf: 'center',
    paddingVertical: wp(10),
    justifyContent: 'space-around'
  },
  containerInput: {
    ...Spacing.marginBottomMd,
    position: 'relative',
  },
  textInput: {
    borderColor: Colors.colorGray,
    borderWidth: wp(0.3),
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    paddingVertical: wp(1),
    ...Typography.fontTextNormal,
  },
  errorInput: {
    borderColor: Colors.colorDanger,
  },
  textLabel: {
    backgroundColor: Colors.colorWhite,
    position: 'absolute',
    color: Colors.colorGray2,
    ...Typography.fontTextNormal,
    marginLeft: wp(4),
    top: -wp(3),
    zIndex: 1,
  },
  errorMessage: {
    ...Typography.fontTextNormal,
    fontSize: wp(3.5),
    color: Colors.colorDanger,
  },
  btnForm: {
    ...Buttons.buttonPrimary,
    alignSelf: 'center',
    width: wp(75),
    height: wp(13),
  },
  textForm: {
    color: Colors.colorWhite,
    ...Typography.fontTextNormal,
  },
});
