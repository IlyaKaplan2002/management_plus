import { object, string } from 'yup';

export const addProjectSchema = object({
  name: string().min(5, 'Should be at least 5 symbols').required('Is required'),
  description: string()
    .min(10, 'Should be at least 10 symbols')
    .required('Is required'),
});
