import Joi from 'joi';
import { Response, NextFunction } from 'express';
import throwError from '@helpers/throwError';
import { Request } from '@types';
import ctrlWrapper from './ctrlWrapper';

const validate = (schema: Joi.AnySchema) => {
  return ctrlWrapper((req: Request, res: Response, next: NextFunction) => {
    const { error: joiError } = schema.validate(req.body);
    if (joiError) {
      throwError(joiError.message, 400);
    }
    next();
  });
};

export default validate;
