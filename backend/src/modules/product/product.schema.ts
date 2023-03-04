import Joi from 'joi';

export default class ProductSchema {
  public static create = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    cost: Joi.number(),
  });

  public static createMany = Joi.array().items(this.create);

  public static update = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    cost: Joi.number(),
  }).min(1);
}
