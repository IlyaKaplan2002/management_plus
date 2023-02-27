import { object, string } from 'yup';

export const addCostsCategorySchema = object({
  name: string().min(1, 'Should be at least 1 symbol').required('Is required'),
});
