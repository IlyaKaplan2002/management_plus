import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import PeriodSchema from './period.schema';
import PeriodController from './period.controller';
import plannedSellQuantityRouter from '../plannedSellQuantity';
import incomeStatisticsRouter from '../incomeStatistics';
import otherIncomeStatisticsRouter from '../otherIncomeStatistics';
import normativePriceRouter from '../normativePrice';
import manufacturedQuantityStatisticsRouter from '../manufacturedQuantityStatistics';

const router = Router({ mergeParams: true });

router.get('/', auth(), ctrlWrapper(PeriodController.get));

router.post(
  '/',
  validate(PeriodSchema.create),
  auth(),
  ctrlWrapper(PeriodController.create),
);

router.put(
  '/:id',
  validate(PeriodSchema.update),
  auth(),
  ctrlWrapper(PeriodController.update),
);

router.delete('/:id', auth(), ctrlWrapper(PeriodController.delete));

router.use('/:period/planned-sell-quantities', plannedSellQuantityRouter);

router.use('/:period/income-statistics', incomeStatisticsRouter);

router.use('/:period/other-income-statistics', otherIncomeStatisticsRouter);

router.use('/:period/normative-price', normativePriceRouter);

router.use(
  '/:period/manufactured-quantity-statistics',
  manufacturedQuantityStatisticsRouter,
);

export default router;
