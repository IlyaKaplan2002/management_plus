import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import CostsStatisticsSchema from './costsStatistics.schema';
import CostsStatisticsController from './costsStatistics.controller';

const router = Router({ mergeParams: true });

router.get('/', auth(), ctrlWrapper(CostsStatisticsController.get));

router.post(
  '/',
  validate(CostsStatisticsSchema.create),
  auth(),
  ctrlWrapper(CostsStatisticsController.create),
);

router.post(
  '/many',
  validate(CostsStatisticsSchema.createMany),
  auth(),
  ctrlWrapper(CostsStatisticsController.createMany),
);

router.put(
  '/:id',
  validate(CostsStatisticsSchema.update),
  auth(),
  ctrlWrapper(CostsStatisticsController.update),
);

router.delete('/:id', auth(), ctrlWrapper(CostsStatisticsController.delete));

export default router;
