import Joi from 'joi';

export default class StatisticsSchema {
  public static create = Joi.object({
    date: Joi.date().required(),
    costs: Joi.number().required(),
    incomes: Joi.number().required(),
  });

  public static update = Joi.object({
    date: Joi.date(),
    costs: Joi.number(),
    incomes: Joi.number(),
  }).min(1);
}
