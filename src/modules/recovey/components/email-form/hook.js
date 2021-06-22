import {Keyboard, Alert} from 'react-native';

import AuthServices from '../../../../services/authServices';

import {SET_LOADING} from '../../../../redux/constants/loadingConstants';


export const useEmailForm = (dispatch, navigation) => {
  //const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = async ({email}, {resetForm}) => {
    Keyboard.dismiss();
    dispatch({type: SET_LOADING, payload: true});
    try {
      await AuthServices.forgotPassword(email)
      dispatch({type: SET_LOADING, payload: false});
      navigation.replace('Recovery2', { email })
    } catch (error) {
      console.log(error.response.status)
      let message = '';
      if(error.response.status == 500) {
        message = 'Ocurrió un error, intentelo más tarde.'
      } else {
        message = 'Este correo electrónico no está registrado.'
      }

      dispatch({type: SET_LOADING, payload: false});
      showAlertFail(resetForm, {email: ''}, message);
    }
  };

  const showAlertFail = (
    resetForm,
    resetInputs, //STRING, FUNCCION, OBJETO DE STRINGS,,
    message
  ) =>
    Alert.alert('¡Upps¡', message, [
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
  };
};
