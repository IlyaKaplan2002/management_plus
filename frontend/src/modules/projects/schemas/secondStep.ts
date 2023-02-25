import { number, object, string } from 'yup';

export const secondStepSchema = object({
  name: string().min(1, 'Should be at least 1 symbol').required('Is required'),
  price: number().typeError('Must be a valid number').required('Is required'),
  cost: number().typeError('Must be a valid number'),
});
