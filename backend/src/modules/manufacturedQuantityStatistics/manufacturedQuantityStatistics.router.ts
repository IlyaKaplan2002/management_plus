import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import ManufacturedQuantityStatisticsSchema from './manufacturedQuantityStatistics.schema';
import ManufacturedQuantityStatisticsController from './manufacturedQuantityStatistics.controller';

const router = Router({ mergeParams: true });

router.get(
  '/',
  auth(),
  ctrlWrapper(ManufacturedQuantityStatisticsController.get),
);

router.post(
  '/',
  validate(ManufacturedQuantityStatisticsSchema.create),
  auth(),
  ctrlWrapper(ManufacturedQuantityStatisticsController.create),
);

router.post(
  '/many',
  validate(ManufacturedQuantityStatisticsSchema.createMany),
  auth(),
  ctrlWrapper(ManufacturedQuantityStatisticsController.createMany),
);

router.put(
  '/:id',
  validate(ManufacturedQuantityStatisticsSchema.update),
  auth(),
  ctrlWrapper(ManufacturedQuantityStatisticsController.update),
);

router.delete(
  '/:id',
  auth(),
  ctrlWrapper(ManufacturedQuantityStatisticsController.delete),
);

export default router;
