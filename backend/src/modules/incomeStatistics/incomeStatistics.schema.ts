import Joi from 'joi';

export default class IncomeStatisticsSchema {
  public static create = Joi.object({
    creationDate: Joi.date().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    productId: Joi.string().required(),
  });

  public static createMany = Joi.array().items(this.create);

  public static update = Joi.object({
    creationDate: Joi.date(),
    quantity: Joi.number(),
    price: Joi.number(),
    productId: Joi.string(),
  }).min(1);
}
