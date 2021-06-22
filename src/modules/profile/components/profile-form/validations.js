import * as yup from 'yup';

export const ProfileSchema = yup.object().shape({
  name: yup.string().required('Su nombre es requerido.'),
  surname: yup.string().required('Su apellido es requerido.'),
});
