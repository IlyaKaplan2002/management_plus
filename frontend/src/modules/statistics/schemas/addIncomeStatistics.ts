import { number, object } from 'yup';

export const addIncomeStatisticsSchema = object({
  quantity: number()
    .required('Is required')
    .typeError('Should be a valid number'),
});
