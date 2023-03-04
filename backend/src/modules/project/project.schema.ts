import Joi from 'joi';

export default class ProjectSchema {
  public static create = Joi.object({
    name: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
  });

  public static update = Joi.object({
    name: Joi.string().min(5),
    description: Joi.string().min(10),
  }).min(1);
}
