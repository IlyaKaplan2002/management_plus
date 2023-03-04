import Joi from 'joi';

export default class PeriodSchema {
  public static create = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date(),
  });

  public static update = Joi.object({
    startDate: Joi.date(),
    endDate: Joi.date(),
  }).min(1);
}
