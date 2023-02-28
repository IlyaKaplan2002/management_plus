import { number, object, string } from 'yup';

export const addcostsStatisticsSchema = object({
  category: string().required('Is required'),
  costs: number().required('Is required').typeError('Should be a valid number'),
});
