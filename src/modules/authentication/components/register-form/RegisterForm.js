import React from 'react';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {useRegisterForm} from './hook';
import {RegisterSchema} from './validation';
import {RectButton} from 'react-native-gesture-handler';
import {Formik} from 'formik';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Spacing, Typography, Buttons} from '../../../../styles';

import IconHidePassword from '../../../../assets/svg/icons/hide-password.svg';
import IconShowPassword from '../../../../assets/svg/icons/show-password.svg';

import {registerUser} from '../../../../redux/actions/authActions';
import {linkinApp} from '../../../../utils/functions';

const RegisterForm = function ({navigation, dispatch, loaded}) {
  const {
    showPassword,
    changeHideOrShowPassword,
    handleSubmit,
  } = useRegisterForm(dispatch, navigation, registerUser);

  return (
    <View style={styles.containerForm}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{name: '', email: '', password: '', surname: ''}}
        validationSchema={RegisterSchema}>
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
                    (errors.namesur && touched.surname) === true
                      ? styles.errorInput
                      : null,
                  ]}
                  onChangeText={handleChange('surname')}
                  onBlur={handleBlur('surname')}
                  value={values.surnaname}
                />
                {errors.surname && touched.surname && (
                  <Text style={styles.errorMessage}>{errors.surname}</Text>
                )}
              </View>
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
                    styles.textInput,
                    {paddingRight: wp(9)},
                    (errors.password && touched.password) === true
                      ? styles.errorInput
                      : null,
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
                  onPress={() => {
                    let url = 'https://peloteada.com/terminos';
                    linkinApp(url);
                  }}>
                  <Text style={[styles.textCondition]}>
                    Acepto{' '}
                    <Text style={{color: Colors.colorPrimary}}>
                      Términos y condiciones
                    </Text>
                  </Text>
                </RectButton>
                <RectButton
                  onPress={() => navigation.navigate('Login')}
                  style={{...Spacing.marginBottomLg}}>
                  <Text style={styles.textCondition}>
                    Inicia{' '}
                    <Text style={{color: Colors.colorPrimary}}>sesión</Text>
                  </Text>
                </RectButton>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
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
                  Registrarse
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

RegisterForm.propTypes = {
  loaded: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {loaded} = state.loading;
  return {
    loaded,
  };
};

export default connect(mapStateToProps)(RegisterForm);

const styles = StyleSheet.create({
  containerForm: {
    width: wp(90),
    alignSelf: 'center',
    ...Spacing.paddingVertical,
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
