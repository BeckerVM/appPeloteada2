import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const PhoneSchema = yup.object().shape({
  phone: yup.string().required('Tu número es requerido.').matches(phoneRegExp, 'Tu número no es válido.').min(9, 'tu número no es valido')
  .max(9, 'Tu número no es valido.'),
});
