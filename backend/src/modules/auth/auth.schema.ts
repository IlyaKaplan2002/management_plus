import Joi from 'joi';

export default class AuthSchema {
  public static signUp = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  public static signIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
}
