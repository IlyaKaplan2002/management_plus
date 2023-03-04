import Joi from 'joi';

export default class CostsCategorySchema {
  public static create = Joi.object({
    name: Joi.string().required(),
  });

  public static createMany = Joi.array().items(this.create);

  public static update = Joi.object({
    name: Joi.string(),
  }).min(1);
}
