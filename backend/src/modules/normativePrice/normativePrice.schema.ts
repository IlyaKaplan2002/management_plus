import Joi from 'joi';

export default class NormativePriceSchema {
  public static create = Joi.object({
    price: Joi.number().required(),
    productId: Joi.string().required(),
  });

  public static createMany = Joi.array().items(this.create);

  public static update = Joi.object({
    price: Joi.number(),
    productId: Joi.string(),
  }).min(1);
}
