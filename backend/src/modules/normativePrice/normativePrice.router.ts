import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import NormativePriceSchema from './normativePrice.schema';
import NormativePriceController from './normativePrice.controller';

const router = Router({ mergeParams: true });

router.get('/', auth(), ctrlWrapper(NormativePriceController.get));

router.post(
  '/',
  validate(NormativePriceSchema.create),
  auth(),
  ctrlWrapper(NormativePriceController.create),
);

router.post(
  '/many',
  validate(NormativePriceSchema.createMany),
  auth(),
  ctrlWrapper(NormativePriceController.createMany),
);

router.put(
  '/:id',
  validate(NormativePriceSchema.update),
  auth(),
  ctrlWrapper(NormativePriceController.update),
);

router.delete('/:id', auth(), ctrlWrapper(NormativePriceController.delete));

export default router;
