import * as yup from 'yup';

export const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Por favor ingrese un correo valido.')
    .required('Su correo electrónico es requerido.'),
});
