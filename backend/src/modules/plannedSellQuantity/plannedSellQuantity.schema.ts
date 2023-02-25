import Joi from 'joi';

export default class PlannedSellQuantitySchema {
  public static create = Joi.object({
    quantity: Joi.number().required(),
    productId: Joi.string().required(),
  });

  public static createMany = Joi.array().items(this.create);

  public static update = Joi.object({
    quantity: Joi.number(),
    productId: Joi.string(),
  }).min(1);
}
