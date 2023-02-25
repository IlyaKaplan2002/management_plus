import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import IncomeStatisticsSchema from './incomeStatistics.schema';
import IncomeStatisticsController from './incomeStatistics.controller';

const router = Router({ mergeParams: true });

router.get('/', auth(), ctrlWrapper(IncomeStatisticsController.get));

router.post(
  '/',
  validate(IncomeStatisticsSchema.create),
  auth(),
  ctrlWrapper(IncomeStatisticsController.create),
);

router.post(
  '/many',
  validate(IncomeStatisticsSchema.createMany),
  auth(),
  ctrlWrapper(IncomeStatisticsController.createMany),
);

router.put(
  '/:id',
  validate(IncomeStatisticsSchema.update),
  auth(),
  ctrlWrapper(IncomeStatisticsController.update),
);

router.delete('/:id', auth(), ctrlWrapper(IncomeStatisticsController.delete));

export default router;
