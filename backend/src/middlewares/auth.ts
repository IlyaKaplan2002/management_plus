import throwError from '@helpers/throwError';
import { verifyToken } from '@helpers/tokenHelpers';
import { Response, NextFunction } from 'express';
import UserService from '@modules/user/user.service';
import { Request } from '@types';
import ctrlWrapper from './ctrlWrapper';

const auth = (tokenName?: 'token' | 'refreshToken') =>
  ctrlWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throwError('Bearer should be in Authorization header', 401);
    }

    if (!token) {
      throwError('Token was not provided', 401);
    }

    const id = verifyToken(token);

    if (!id) {
      throwError('Token is invalid', 401);
    }

    const user = await UserService.findById(id);

    if (!user || user[tokenName || 'token'] !== token) {
      throwError('Token is invalid', 401);
    }

    req.user = user;
    next();
  });

export default auth;
