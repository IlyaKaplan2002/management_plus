import auth from '@middlewares/auth';
import ctrlWrapper from '@middlewares/ctrlWrapper';
import validate from '@middlewares/validate';
import { Router } from 'express';
import AuthController from './auth.controller';
import AuthSchema from './auth.schema';

const router = Router();

router.post(
  '/signup',
  validate(AuthSchema.signUp),
  ctrlWrapper(AuthController.signUp),
);

router.post(
  '/signin',
  validate(AuthSchema.signIn),
  ctrlWrapper(AuthController.signIn),
);

router.get('/signout', auth(), ctrlWrapper(AuthController.signOut));

router.get('/', auth(), ctrlWrapper(AuthController.getCurrentUser));

router.get(
  '/refresh',
  auth('refreshToken'),
  ctrlWrapper(AuthController.refreshToken),
);

export default router;
