import {useState} from 'react'
import {Keyboard, Alert} from 'react-native';
import axios from 'axios';

import {API_URL, authHeader} from '../../../../utils/api';
import {SET_LOADING} from '../../../../redux/constants/loadingConstants';


export const usePassword = (dispatch, setModalVisible) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async ({currentPassword, newPassword, confirmPassword}, {resetForm}) => {
    Keyboard.dismiss();
    dispatch({type: SET_LOADING, payload: true});
    try {
      const headers = await authHeader();
      await axios.post(
        `${API_URL}/user/reset`,
        {last_password: currentPassword, password: newPassword, repeat_password: confirmPassword},
        {headers},
      );
      dispatch({type: SET_LOADING, payload: false});
      showAlert('Su contraseña fue cambiada correctamente.', '¡Listo!')
      setModalVisible(false)
    } catch (error) {
      dispatch({type: SET_LOADING, payload: false});
      showAlert('Ingrese los datos correctamente para continuar', 'Datos invalidos');
    }
  };

  const showAlert = (
    message,
    title
  ) =>
    Alert.alert(title, message, [
      {
        text: 'OK',
      },
    ]);

  return {
    handleSubmit,
    showPassword, 
    setShowPassword
  };
};
