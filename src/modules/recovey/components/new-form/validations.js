import * as yup from 'yup';

export const NewSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, ({min}) => `Su nueva contraseña debe tener minimo ${min} caracteres.`)
    .required('Su nueva contraseña es requerida.'),
  repeatPassword: yup
    .string()
    .min(6, ({min}) => `Este campo debe tener minimo ${min} caracteres.`)
    .required('Este campo es requerido.'),
});
