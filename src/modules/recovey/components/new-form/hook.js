import {Keyboard, Alert} from 'react-native';
import {useState} from 'react';

import AuthServices from '../../../../services/authServices';

import {SET_LOADING} from '../../../../redux/constants/loadingConstants';

export const useNewForm = (dispatch, navigation, email) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = async ({newPassword, repeatPassword}, {resetForm}) => {
    Keyboard.dismiss();
    dispatch({type: SET_LOADING, payload: true});
    try {
      await AuthServices.sendNewPassword(
        email,
        newPassword,
        repeatPassword,
      );
      dispatch({type: SET_LOADING, payload: false});
      showAlertSucces()
    } catch (error) {
      dispatch({type: SET_LOADING, payload: false});
      showAlertFail(resetForm, {newPassword: '', repeatPassword: ''});
    }
  };

  const showAlertSucces = () =>
    Alert.alert(
      'Contraseña valida',
      'Su contraseña ha sido cambiada correctamente.',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('Login')
          }
        }
      ]
    );

  const showAlertFail = (
    resetForm,
    resetInputs, //STRING, FUNCCION, OBJETO DE STRINGS
  ) =>
    Alert.alert(
      'Upps!',
      'Verifique si los datos son correctos',
      [
        {
          text: 'OK',
          onPress: () => {
            resetForm({
              values: resetInputs,
            });
          },
        },
      ],
    );

  return {
    handleSubmit,
    showPassword,
    setShowPassword,
  };
};
