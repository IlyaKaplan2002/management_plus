import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import StatisticsSchema from './statistics.schema';
import StatisticsController from './statistics.controller';

const router = Router({ mergeParams: true });

router.get('/', auth(), ctrlWrapper(StatisticsController.get));

router.post(
  '/',
  validate(StatisticsSchema.create),
  auth(),
  ctrlWrapper(StatisticsController.create),
);

router.put(
  '/:id',
  validate(StatisticsSchema.update),
  auth(),
  ctrlWrapper(StatisticsController.update),
);

router.delete('/:id', auth(), ctrlWrapper(StatisticsController.delete));

export default router;
