import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {usePassword} from './hook';
import Modal from 'react-native-modal';
import {RectButton} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import {PasswordSchema} from './validations';
import LottieView from 'lottie-react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Spacing, Typography, Buttons} from '../../../../styles';

import IconHidePassword from '../../../../assets/svg/icons/hide-password.svg';
import IconShowPassword from '../../../../assets/svg/icons/show-password.svg';

const ModalFormPassword = ({
  modalVisible,
  setModalVisible,
  dispatch,
  loaded,
}) => {
  const {handleSubmit, showPassword, setShowPassword} = usePassword(
    dispatch,
    setModalVisible
  );

  return (
    <Modal
      onBackdropPress={() => setModalVisible(false)}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      isVisible={modalVisible}
      style={{margin: 0}}
      onBackButtonPress={() => {
        setModalVisible(false);
      }}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={styles.container}>
          <View style={styles.containerForm}>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={PasswordSchema}
              onSubmit={handleSubmit}>
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
                    <View
                      style={[
                        styles.containerInput,
                        {...Spacing.marginBottomLg},
                      ]}>
                      <Text style={styles.textLabel}>Contraseña actual</Text>
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.btnPassword}>
                        {!showPassword ? (
                          <IconShowPassword width={wp(5)} height={wp(5)} />
                        ) : (
                          <IconHidePassword width={wp(5)} height={wp(5)} />
                        )}
                      </TouchableOpacity>
                      <TextInput
                        style={[
                          styles.textInput,
                          {paddingRight: wp(9)},
                          (errors.currentPassword &&
                            touched.currentPassword) === true
                            ? styles.errorInput
                            : null,
                        ]}
                        secureTextEntry={showPassword}
                        onChangeText={handleChange('currentPassword')}
                        onBlur={handleBlur('currentPassword')}
                        value={values.currentPassword}
                      />
                      {errors.currentPassword && touched.currentPassword && (
                        <Text style={styles.errorMessage}>
                          {errors.currentPassword}
                        </Text>
                      )}
                    </View>
                    <View
                      style={[
                        styles.containerInput,
                        {...Spacing.marginBottomLg},
                      ]}>
                      <Text style={styles.textLabel}>Contraseña nueva</Text>
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.btnPassword}>
                        {!showPassword ? (
                          <IconShowPassword width={wp(5)} height={wp(5)} />
                        ) : (
                          <IconHidePassword width={wp(5)} height={wp(5)} />
                        )}
                      </TouchableOpacity>
                      <TextInput
                        style={[
                          {paddingRight: wp(9)},
                          (errors.newPassword && touched.newPassword) === true
                            ? styles.errorInput
                            : null,
                          styles.textInput,
                        ]}
                        secureTextEntry={showPassword}
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                        value={values.newPassword}
                      />
                      {errors.newPassword && touched.newPassword && (
                        <Text style={styles.errorMessage}>
                          {errors.newPassword}
                        </Text>
                      )}
                    </View>
                    <View
                      style={[
                        styles.containerInput,
                        {...Spacing.marginBottomLg},
                      ]}>
                      <Text style={styles.textLabel}>Confirmar contraseña</Text>
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.btnPassword}>
                        {!showPassword ? (
                          <IconShowPassword width={wp(5)} height={wp(5)} />
                        ) : (
                          <IconHidePassword width={wp(5)} height={wp(5)} />
                        )}
                      </TouchableOpacity>
                      <TextInput
                        style={[
                          {paddingRight: wp(9)},
                          (errors.confirmPassword &&
                            touched.confirmPassword) === true
                            ? styles.errorInput
                            : null, styles.textInput,
                        ]}
                        secureTextEntry={showPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={styles.errorMessage}>
                          {errors.confirmPassword}
                        </Text>
                      )}
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
          </View>
        </View>
      </View>
    </Modal>
  );
};

ModalFormPassword.propTypes = {
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  loaded: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {loaded} = state.loading;

  return {
    loaded,
  };
};

export default connect(mapStateToProps)(ModalFormPassword);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorWhite,
    height: wp(100),
    borderTopRightRadius: wp(14),
    borderTopLeftRadius: wp(14),
  },
  containerForm: {
    width: wp(90),
    alignSelf: 'center',
    paddingTop: wp(10),
    flex: 1,
  },
  form: {
    justifyContent: 'space-between',
    flex: 1,
    ...Spacing.paddingVerticalXm,
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
    fontSize: wp(3),
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
