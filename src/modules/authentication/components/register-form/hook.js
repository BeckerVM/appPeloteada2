import {useState} from 'react';
import {Keyboard, Alert} from 'react-native';

export const useRegisterForm = (dispatch, navigation, registerUser) => {
  const [showPassword, setShowPassword] = useState(true);

  const changeHideOrShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = ({name, email, password, surname}, {resetForm}) => {
    Keyboard.dismiss();

    dispatch(registerUser(name, email, password, surname))
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeTab'}],
        });
      })
      .catch((message) => {
        if (message.includes('correo')) {
          showAlertFail(message, resetForm, {name, email: '', password});
        }
      });
  };

  const showAlertFail = (
    message,
    resetForm,
    resetInputs, //STRING, FUNCION, OBJETO DE STRINGS
  ) =>
    Alert.alert('Datos Invalidos', message, [
      {
        text: 'OK',
        onPress: () => {
          resetForm({
            values: resetInputs,
          });
        },
      },
    ]);

  return {
    handleSubmit,
    changeHideOrShowPassword,
    showPassword,
  };
};
