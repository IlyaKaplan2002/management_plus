import Joi from 'joi';

export default class CostsStatisticsSchema {
  public static create = Joi.object({
    creationDate: Joi.date().required(),
    costs: Joi.number().required(),
    costsCategoryId: Joi.string().required(),
  });

  public static createMany = Joi.array().items(this.create);

  public static update = Joi.object({
    creationDate: Joi.date(),
    costs: Joi.number(),
    costsCategoryId: Joi.string(),
  }).min(1);
}
