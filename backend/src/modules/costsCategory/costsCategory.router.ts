import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import CostsCategorySchema from './costsCategory.schema';
import CostsCategoryController from './costsCategory.controller';

const router = Router({ mergeParams: true });

router.get('/', auth(), ctrlWrapper(CostsCategoryController.get));

router.post(
  '/',
  validate(CostsCategorySchema.create),
  auth(),
  ctrlWrapper(CostsCategoryController.create),
);

router.post(
  '/many',
  validate(CostsCategorySchema.createMany),
  auth(),
  ctrlWrapper(CostsCategoryController.createMany),
);

router.put(
  '/:id',
  validate(CostsCategorySchema.update),
  auth(),
  ctrlWrapper(CostsCategoryController.update),
);

router.delete('/:id', auth(), ctrlWrapper(CostsCategoryController.delete));

export default router;
