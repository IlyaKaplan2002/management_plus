import { object, string } from 'yup';

export const loginSchema = object({
  email: string().email('Should be a valid email').required('Is required'),
  password: string()
    .min(8, 'Should be at least 8 symbols')
    .required('Is required'),
});
