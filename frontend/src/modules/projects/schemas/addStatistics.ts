import { date, number, object } from 'yup';

export const addStatistics = object({
  date: date().required('Is required'),
  costs: number().required('Is required').typeError('Should be a valid number'),
  incomes: number()
    .required('Is required')
    .typeError('Should be a valid number'),
});
