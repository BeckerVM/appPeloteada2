import React from 'react';
import PropTypes from 'prop-types'
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {useLoginForm} from './hook';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import {LoginSchema} from './validations';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Spacing, Typography, Buttons} from '../../../../styles';

import IconHidePassword from '../../../../assets/svg/icons/hide-password.svg';
import IconShowPassword from '../../../../assets/svg/icons/show-password.svg';

import {loginUser} from '../../../../redux/actions/authActions';

const LoginForm = function ({navigation, dispatch, loaded}) {
  const {handleSubmit, changeHideOrShowPassword, showPassword} = useLoginForm(
    dispatch,
    navigation,
    loginUser,
  );

  return (
    <View style={styles.containerForm}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}>
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
              <View
                style={[styles.containerInput, {...Spacing.marginBottomLg}]}>
                <Text style={styles.textLabel}>Contraseña</Text>
                <RectButton
                  onPress={changeHideOrShowPassword}
                  style={styles.btnPassword}>
                  {showPassword === false ? (
                    <IconShowPassword width={wp(5)} height={wp(5)} />
                  ) : (
                    <IconHidePassword width={wp(5)} height={wp(5)} />
                  )}
                </RectButton>
                <TextInput
                  style={[
                    {paddingRight: wp(9)},
                    (errors.password && touched.password) === true
                      ? styles.errorInput
                      : null,
                      styles.textInput,
                  ]}
                  secureTextEntry={showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <RectButton
                  style={{...Spacing.marginBottomLg}}
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.textCondition]}>
                    Registrarse{' '}
                    <Text style={{color: Colors.colorPrimary}}>Aquí</Text>
                  </Text>
                </RectButton>
                <RectButton style={{...Spacing.marginBottomLg}} onPress={() => navigation.navigate('Recovery1')}>
                  <Text style={styles.textCondition}>
                    ¿Olvidaste tu contraseña?
                  </Text>
                </RectButton>
              </View>
            </View>
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
                  Iniciar sesión
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

LoginForm.propTypes = {
  loaded: PropTypes.bool
}

const mapStateToProps = state => {
  const {loaded} = state.loading

  return {
    loaded
  }
}

export default connect(mapStateToProps)(LoginForm);

const styles = StyleSheet.create({
  containerForm: {
    width: wp(90),
    alignSelf: 'center',
    paddingVertical: wp(20),
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
  textCondition: {
    color: Colors.colorGray2,
    ...Typography.fontTextNormal,
    textAlign: 'center',
    fontSize: wp(3.5),
  },
  errorMessage: {
    ...Typography.fontTextNormal,
    fontSize: wp(3.5),
    color: Colors.colorDanger,
  },
  btnForm: {
    ...Buttons.buttonPrimary,
    alignSelf: 'center',
  },
  btnPassword: {
    position: 'absolute',
    right: wp(0.5),
    top: wp(1),
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  textForm: {
    color: Colors.colorWhite,
    ...Typography.fontTextNormal,
  },
});
