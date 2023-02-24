import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import PeriodSchema from './period.schema';
import PeriodController from './period.controller';
import plannedSellQuantityRouter from '../plannedSellQuantity';

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

export default router;
