
import {useState} from 'react';
import {Keyboard, Alert} from 'react-native';

export const useLoginForm = (dispatch, navigation, loginUser) => {
  const [showPassword, setShowPassword] = useState(true);

  const changeHideOrShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = ({email, password}, {resetForm}) => {
    Keyboard.dismiss();

    dispatch(loginUser(email, password))
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeTab'}],
        });
      })
      .catch((message) => {
        showAlertFail(message, resetForm, {email: '', password: ''});
      });
  };

  const showAlertFail = (
    message,
    resetForm,
    resetInputs, //STRING, FUNCCION, OBJETO DE STRINGS
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
