import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import ProjectController from './project.controller';
import PlannedSellQuantityController from '@modules/plannedSellQuantity/plannedSellQuantity.controller';
import ProjectSchema from './project.schema';
import statisticsRouter from '../statistics';
import productRouter from '../product';
import periodRouter from '../period';
import costsCategoryRouter from '../costsCategory';
import NormativePriceController from '@modules/normativePrice/normativePrice.controller';

const router = Router();

router.get('/', auth(), ctrlWrapper(ProjectController.get));

router.post(
  '/',
  validate(ProjectSchema.create),
  auth(),
  ctrlWrapper(ProjectController.create),
);

router.put(
  '/:id',
  validate(ProjectSchema.update),
  auth(),
  ctrlWrapper(ProjectController.update),
);

router.delete('/:id', auth(), ctrlWrapper(ProjectController.delete));

router.get(
  '/:project/normative-prices',
  auth(),
  ctrlWrapper(NormativePriceController.getByProjectId),
);

router.get(
  '/:project/planned-sell-quantities',
  auth(),
  ctrlWrapper(PlannedSellQuantityController.getByProjectId),
);

router.use('/:project/statistics', statisticsRouter);

router.use('/:project/products', productRouter);

router.use('/:project/periods', periodRouter);

router.use('/:project/costs-category', costsCategoryRouter);

export default router;
