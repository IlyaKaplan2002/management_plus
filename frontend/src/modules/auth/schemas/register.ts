import { object, ref, string } from 'yup';

export const registerSchema = object({
  email: string().email('Should be a valid email').required('Is required'),
  password: string()
    .min(8, 'Should be at least 8 symbols')
    .required('Is required'),
  firstName: string().min(1, 'Is required').required('Is required'),
  lastName: string().min(1, 'Is required').required('Is required'),
  passwordConfirm: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Passwords must match'),
});
