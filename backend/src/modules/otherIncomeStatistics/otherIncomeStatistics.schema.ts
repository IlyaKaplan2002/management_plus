import Joi from 'joi';

export default class OtherIncomeStatisticsSchema {
  public static create = Joi.object({
    creationDate: Joi.date().required(),
    income: Joi.number().required(),
  });

  public static update = Joi.object({
    creationDate: Joi.date(),
    income: Joi.number(),
  }).min(1);
}
