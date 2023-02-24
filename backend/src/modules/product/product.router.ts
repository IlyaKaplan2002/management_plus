import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import ProductSchema from './product.schema';
import ProductController from './product.controller';

const router = Router({ mergeParams: true });

router.get('/', auth(), ctrlWrapper(ProductController.get));

router.post(
  '/',
  validate(ProductSchema.create),
  auth(),
  ctrlWrapper(ProductController.create),
);

router.post(
  '/many',
  validate(ProductSchema.createMany),
  auth(),
  ctrlWrapper(ProductController.createMany),
);

router.put(
  '/:id',
  validate(ProductSchema.update),
  auth(),
  ctrlWrapper(ProductController.update),
);

router.delete('/:id', auth(), ctrlWrapper(ProductController.delete));

export default router;
