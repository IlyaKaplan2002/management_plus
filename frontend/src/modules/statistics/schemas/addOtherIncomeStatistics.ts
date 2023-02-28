import { number, object } from 'yup';

export const addOtherIncomeStatisticsSchema = object({
  income: number()
    .required('Is required')
    .typeError('Should be a valid number'),
});
