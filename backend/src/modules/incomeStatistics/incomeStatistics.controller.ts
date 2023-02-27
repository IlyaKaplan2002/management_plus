import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import ProjectService from '@modules/project/project.service';
import PeriodService from '@modules/period/period.service';
import ProductService from '@modules/product/product.service';
import { Request } from '@types';
import { Response } from 'express';
import IncomeStatisticsService from './incomeStatistics.service';

export default class IncomeStatisticsController {
  public static get = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, period: periodId } = req.params;
    const { product: productId } = req.query;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const period = await PeriodService.findById(periodId);
    if (!period || period.projectId !== projectId)
      throwError('Period not found', 404);

    if (productId && typeof productId === 'string') {
      const product = await ProductService.findById(productId);

      if (!product || product.projectId !== projectId)
        throwError('Product not found', 404);

      const incomeStatistics =
        await IncomeStatisticsService.findByPeriodIdAndProductId(
          periodId,
          productId,
        );

      createResponse({ res, data: { incomeStatistics } });
      return;
    }

    const incomeStatistics = await IncomeStatisticsService.findByPeriodId(
      periodId,
    );

    createResponse({ res, data: { incomeStatistics } });
  };

  public static getByProjectId = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const periods = await PeriodService.findByProjectId(projectId);

    const periodIds = periods.map(item => item.id);

    const incomeStatistics = await IncomeStatisticsService.findByPeriodIds(
      periodIds,
    );

    createResponse({ res, data: { incomeStatistics } });
  };

  public static create = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, period: periodId } = req.params;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const period = await PeriodService.findById(periodId);
    if (!period || period.projectId !== projectId)
      throwError('Period not found', 404);

    const product = await ProductService.findById(req.body.productId);
    if (!product || product.projectId !== projectId)
      throwError('Product not found', 404);

    const incomeStatistics = await IncomeStatisticsService.create({
      ...req.body,
      periodId,
    });

    createResponse({
      res,
      data: { incomeStatistics },
      code: 201,
    });
  };

  public static createMany = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, period: periodId } = req.params;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const period = await PeriodService.findById(periodId);
    if (!period || period.projectId !== projectId)
      throwError('Period not found', 404);

    const incomeStatisticsToInsert = [];

    for (const item of req.body) {
      const product = await ProductService.findById(item.productId);
      if (!product || product.projectId !== projectId)
        throwError('Product not found', 404);
      incomeStatisticsToInsert.push({ ...item, periodId });
    }

    const incomeStatistics = await IncomeStatisticsService.createMany(
      incomeStatisticsToInsert,
    );

    createResponse({
      res,
      data: { incomeStatistics },
      code: 201,
    });
  };

  public static update = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, period: periodId, id } = req.params;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const period = await PeriodService.findById(periodId);
    if (!period || period.projectId !== projectId)
      throwError('Period not found', 404);

    if (req.body.productId) {
      const product = await ProductService.findById(req.body.productId);
      if (!product || product.projectId !== projectId)
        throwError('Product not found', 404);
    }

    const oldIncomeStatistics = await IncomeStatisticsService.findById(id);
    if (!oldIncomeStatistics || oldIncomeStatistics.periodId !== periodId)
      throwError('Item not found', 404);

    const incomeStatistics = await IncomeStatisticsService.update(
      { ...req.body },
      id,
    );

    createResponse({
      res,
      data: {
        incomeStatistics: {
          id: incomeStatistics.id,
          creationDate: incomeStatistics.creationDate,
          quantity: incomeStatistics.quantity,
          price: incomeStatistics.price,
          productId: incomeStatistics.productId,
          periodId: incomeStatistics.periodId,
        },
      },
    });
  };

  public static delete = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, period: periodId, id } = req.params;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const period = await PeriodService.findById(periodId);
    if (!period || period.projectId !== projectId)
      throwError('Period not found', 404);

    const oldIncomeStatistics = await IncomeStatisticsService.findById(id);
    if (!oldIncomeStatistics || oldIncomeStatistics.periodId !== periodId)
      throwError('Item not found', 404);

    const result = await IncomeStatisticsService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
