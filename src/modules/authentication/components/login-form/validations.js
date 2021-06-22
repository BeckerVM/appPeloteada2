import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Por favor ingrese un correo valido.')
    .required('Su correo electrónico es requerido.'),
  password: yup
    .string()
    .min(6, ({min}) => `Su contraseña debe tener minimo ${min} caracteres.`)
    .required('Su contraseña es requerida.'),
});
