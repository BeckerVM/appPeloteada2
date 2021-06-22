import * as yup from 'yup';

export const PasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(6, ({min}) => `Su contraseña actual debe tener mínimo ${min} caracteres.`)
    .required('Su contraseña actual es requerida.'),
  newPassword: yup
    .string()
    .min(6, ({min}) => `La contraseña nueva debe tener mínimo ${min} caracteres.`)
    .required('Su contraseña nueva es requerida.'),
  confirmPassword: yup
    .string()
    .required('La confirmación es requerida.')
});