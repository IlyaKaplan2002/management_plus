import Joi from 'joi';

export default class UserSchema {
  public static update = Joi.object({
    firstName: Joi.string().min(1),
    lastName: Joi.string().min(1),
    email: Joi.string().email(),
  }).min(1);
}
