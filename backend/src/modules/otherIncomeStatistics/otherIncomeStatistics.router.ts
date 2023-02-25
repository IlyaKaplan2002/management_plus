import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import OtherIncomeStatisticsSchema from './otherIncomeStatistics.schema';
import OtherIncomeStatisticsController from './otherIncomeStatistics.controller';

const router = Router({ mergeParams: true });

router.get('/', auth(), ctrlWrapper(OtherIncomeStatisticsController.get));

router.post(
  '/',
  validate(OtherIncomeStatisticsSchema.create),
  auth(),
  ctrlWrapper(OtherIncomeStatisticsController.create),
);

router.put(
  '/:id',
  validate(OtherIncomeStatisticsSchema.update),
  auth(),
  ctrlWrapper(OtherIncomeStatisticsController.update),
);

router.delete(
  '/:id',
  auth(),
  ctrlWrapper(OtherIncomeStatisticsController.delete),
);

export default router;
