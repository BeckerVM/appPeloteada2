import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {ProfileSchema} from './validations';
import {Formik} from 'formik';
import {useProfileForm} from './hook';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Spacing, Typography, Buttons} from '../../../../styles';

import IconPadLock from '../../../../assets/svg/icons/lock.svg';

const ProfileForm = ({loaded = false, data, setModalVisible, dispatch}) => {
  const navigation = useNavigation()
  const {handleSubmit} = useProfileForm(dispatch, navigation);

  return (
    <View style={styles.containerForm}>
      <Formik
        initialValues={{...data}}
        onSubmit={handleSubmit}
        validationSchema={ProfileSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={styles.form}>
            <View style={styles.containerInputs}>
              <View style={[styles.containerInput]}>
                <Text style={styles.textLabel}>Nombre</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    (errors.name && touched.name) === true
                      ? styles.errorInput
                      : null,
                  ]}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorMessage}>{errors.name}</Text>
                )}
              </View>
              <View style={[styles.containerInput]}>
                <Text style={styles.textLabel}>Apellidos</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    (errors.surname && touched.surname) === true
                      ? styles.errorInput
                      : null,
                  ]}
                  onChangeText={handleChange('surname')}
                  onBlur={handleBlur('surname')}
                  value={values.surname}
                />
                {errors.surname && touched.surname && (
                  <Text style={styles.errorMessage}>{errors.surname}</Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={[styles.btnForm, { backgroundColor: Colors.colorWhite, borderColor: Colors.colorPrimary, borderWidth: wp(.3), marginTop: wp(3), flexDirection: 'row', marginBottom: wp(3)}]}>
              <Text
                style={[
                  styles.textForm,
                  { color: Colors.colorPrimary}
                ]}>
                Cambiar Contraseña
              </Text>
              <IconPadLock width={wp(3.5)} height={wp(3.5)} />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!isValid}
              onPress={handleSubmit}
              style={[
                styles.btnForm,
                !isValid === true ? styles.isInvalid : null,
              ]}>
              {loaded === false ? (
                <Text
                  style={[
                    styles.textForm,
                    !isValid === true ? styles.textInvalid : null,
                  ]}>
                  Guardar Cambios
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

ProfileForm.propTypes = {
  setModalVisible: PropTypes.func,
  loaded: PropTypes.bool
}

const mapStateToProps = state => {
  const {loaded} = state.loading

  return {
    loaded
  }
}

export default connect(mapStateToProps)(ProfileForm);

const styles = StyleSheet.create({
  containerForm: {
    width: wp(80),
    alignSelf: 'center',
  },
  containerInput: {
    ...Spacing.marginBottomMd,
    position: 'relative',
  },
  textInput: {
    borderColor: Colors.colorGray,
    backgroundColor: Colors.colorWhite,
    borderWidth: wp(0.3),
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    ...Typography.fontTextNormal,
  },
  errorInput: {
    borderColor: Colors.colorDanger,
  },
  textLabel: {
    color: Colors.colorGray3,
    ...Typography.fontTextNormal,
    ...Spacing.marginBottomXm,
  },
  errorMessage: {
    ...Typography.fontTextNormal,
    fontSize: wp(3.5),
    color: Colors.colorDanger,
  },
  btnForm: {
    ...Buttons.buttonPrimary,
    alignSelf: 'center',
    backgroundColor: Colors.colorPrimary,
    width: wp(80),
    borderRadius: wp(2),
    height: wp(15),
  },
  textForm: {
    color: Colors.colorWhite,
    ...Typography.fontTextNormal,
  },
});
