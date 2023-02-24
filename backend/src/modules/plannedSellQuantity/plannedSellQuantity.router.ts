import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import PlannedSellQuantitySchema from './plannedSellQuantity.schema';
import PlannedSellQuantityController from './plannedSellQuantity.controller';

const router = Router({ mergeParams: true });

router.get('/', auth(), ctrlWrapper(PlannedSellQuantityController.get));

router.post(
  '/',
  validate(PlannedSellQuantitySchema.create),
  auth(),
  ctrlWrapper(PlannedSellQuantityController.create),
);

router.post(
  '/many',
  validate(PlannedSellQuantitySchema.createMany),
  auth(),
  ctrlWrapper(PlannedSellQuantityController.createMany),
);

router.put(
  '/:id',
  validate(PlannedSellQuantitySchema.update),
  auth(),
  ctrlWrapper(PlannedSellQuantityController.update),
);

router.delete(
  '/:id',
  auth(),
  ctrlWrapper(PlannedSellQuantityController.delete),
);

export default router;
