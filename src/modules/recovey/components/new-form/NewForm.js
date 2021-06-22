import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {RectButton} from 'react-native-gesture-handler';
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
import {useNewForm} from './hook';
import {NewSchema} from './validations';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Spacing, Typography, Buttons} from '../../../../styles';

import IconHidePassword from '../../../../assets/svg/icons/hide-password.svg';
import IconShowPassword from '../../../../assets/svg/icons/show-password.svg';

const NewForm = ({dispatch, loaded, email}) => {
  const navigation = useNavigation();
  const {handleSubmit, setShowPassword, showPassword} = useNewForm(dispatch, navigation, email);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={{newPassword: '', repeatPassword: ''}}
        onSubmit={handleSubmit}
        validationSchema={NewSchema}>
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
            <View style={[styles.containerInput, {...Spacing.marginBottomMd}]}>
              <Text style={styles.textLabel}>Nueva Contraseña</Text>
              <RectButton
                onPress={() => setShowPassword(!showPassword)}
                style={styles.btnPassword}>
                {!showPassword ? (
                  <IconShowPassword width={wp(5)} height={wp(5)} />
                ) : (
                  <IconHidePassword width={wp(5)} height={wp(5)} />
                )}
              </RectButton>
              <TextInput
                style={[
                  styles.textInput,
                  {paddingRight: wp(9)},
                  (errors.newPassword && touched.newPassword) === true
                    ? styles.errorInput
                    : null,
                ]}
                secureTextEntry={showPassword}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
              />
              {errors.newPassword && touched.newPassword && (
                <Text style={styles.errorMessage}>{errors.newPassword}</Text>
              )}
            </View>
            <View style={[styles.containerInput], {...Spacing.marginBottomMd}}>
              <Text style={styles.textLabel}>Repetir Contraseña</Text>
              <RectButton
                onPress={() => setShowPassword(!showPassword)}
                style={styles.btnPassword}>
                {!showPassword ? (
                  <IconShowPassword width={wp(5)} height={wp(5)} />
                ) : (
                  <IconHidePassword width={wp(5)} height={wp(5)} />
                )}
              </RectButton>
              <TextInput
                style={[
                  styles.textInput,
                  {paddingRight: wp(9)},
                  (errors.repeatPassword && touched.repeatPassword) === true
                    ? styles.errorInput
                    : null,
                ]}
                secureTextEntry={showPassword}
                onChangeText={handleChange('repeatPassword')}
                onBlur={handleBlur('repeatPassword')}
                value={values.repeatPassword}
              />
              {errors.repeatPassword && touched.repeatPassword && (
                <Text style={styles.errorMessage}>{errors.repeatPassword}</Text>
              )}
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
                  Guardar
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
    </ScrollView>
  );
};

NewForm.propTypes = {
  loaded: PropTypes.bool,
  email: PropTypes.string
};

const mapStateToProps = (state) => {
  const {loaded} = state.loading;

  return {
    loaded,
  };
};

export default connect(mapStateToProps)(NewForm);

const styles = StyleSheet.create({
  containerForm: {
    width: wp(90),
    alignSelf: 'center',
    paddingVertical: wp(10),
  },
  containerInput: {
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
});
