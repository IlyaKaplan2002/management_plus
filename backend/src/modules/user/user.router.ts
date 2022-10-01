import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import UserController from './user.controller';
import UserSchema from './user.schema';

const router = Router();

router.put(
  '/',
  validate(UserSchema.update),
  auth(),
  ctrlWrapper(UserController.update),
);

export default router;
