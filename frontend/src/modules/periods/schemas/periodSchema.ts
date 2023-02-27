import { number, object } from 'yup';

export const periodSchema = object({
  plannedSellQuantity: number().typeError('Must be a valid number'),
  normativePrice: number().typeError('Must be a valid number'),
});
