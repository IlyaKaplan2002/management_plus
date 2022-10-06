import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import ProjectController from './project.controller';
import ProjectSchema from './project.schema';
import statisticsRouter from '../statistics';

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

router.use('/:project/statistics', statisticsRouter);

export default router;
