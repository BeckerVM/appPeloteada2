import {
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import AuthServices from '../../../../services/authServices';
import {SET_LOADING} from '../../../../redux/constants/loadingConstants';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Spacing, Typography, Buttons} from '../../../../styles';

const CELL_SIZE = wp(15);
const CELL_BORDER_RADIUS = wp(2);
const DEFAULT_CELL_BG_COLOR = Colors.colorWhite;
const NOT_EMPTY_CELL_BG_COLOR = Colors.colorPrimary;
const ACTIVE_CELL_BG_COLOR = Colors.colorWhite;

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 4;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const CodeForm = ({dispatch, loaded, email}) => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  const handleSendCode = async () => {
    dispatch({type: SET_LOADING, payload: true});
    try {
      await AuthServices.verificationCode(email, value.toLowerCase());
      dispatch({type: SET_LOADING, payload: false});
      navigation.replace('Recovery3', {email: email});
    } catch (error) {
      dispatch({type: SET_LOADING, payload: false});
      showAlert('Upss!', 'Ingrese el código correcto para continuar.', () => {
        setValue('')
      })
    }
  };

  const handleResendEmail = async () => {
    dispatch({type: SET_LOADING, payload: true});
    try {
      await AuthServices.forgotPassword(email)
      dispatch({type: SET_LOADING, payload: false});
      showAlert('Código enviado', 'Se le envió un nuevo código a su correo electrónico.')
    } catch (error) {
      dispatch({type: SET_LOADING, payload: false});
      showAlertFail(resetForm, {email: ''});
    }
  }

  const showAlert = (title, message, cb = null) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            if(cb !== null) {
              cb()
            }
          }
        }
      ]
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="default"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <TouchableOpacity
        onPress={handleResendEmail}
        style={{width: wp(35), alignSelf: 'center', ...Spacing.marginTopMd}}>
        <Text
          style={{color: Colors.colorSecondary, ...Typography.fontTextNormal}}>
          Reenviar código
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => handleSendCode()}>
        {loaded === false ? (
          <Text style={[styles.nextButtonText]}>Verificar</Text>
        ) : (
          <LottieView
            style={{width: wp(20), height: wp(20)}}
            source={require('../../../../assets/animations/loading-1.json')}
            autoPlay
          />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

CodeForm.propTypes = {
  loaded: PropTypes.bool,
  email: PropTypes.string,
};

const mapStateToProps = (state) => {
  const {loaded} = state.loading;

  return {
    loaded,
  };
};

export default connect(mapStateToProps)(CodeForm);

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: wp(10),
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: wp(5),
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 0,
    ...Typography.fontTextNormal,
    fontSize: wp(10),
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: Colors.colorWhite,
    backgroundColor: Colors.colorWhite,
    // Android
    elevation: 3,
  },

  // =======================

  root: {
    minHeight: 800,
    padding: wp(0),
  },
  nextButton: {
    ...Buttons.buttonPrimary,
    alignSelf: 'center',
    width: wp(75),
    height: wp(13),
    marginTop: wp(11),
  },
  nextButtonText: {
    color: Colors.colorWhite,
    ...Typography.fontTextSemiBold,
  },
});
