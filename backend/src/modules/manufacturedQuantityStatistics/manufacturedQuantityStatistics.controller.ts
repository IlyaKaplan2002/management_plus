import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import ProjectService from '@modules/project/project.service';
import PeriodService from '@modules/period/period.service';
import ProductService from '@modules/product/product.service';
import { Request } from '@types';
import { Response } from 'express';
import ManufacturedQuantityStatisticsService from './manufacturedQuantityStatistics.service';

export default class ManufacturedQuantityStatisticsController {
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

      const manufacturedQuantityStatistics =
        await ManufacturedQuantityStatisticsService.findByPeriodIdAndProductId(
          periodId,
          productId,
        );

      createResponse({ res, data: { manufacturedQuantityStatistics } });
      return;
    }

    const manufacturedQuantityStatistics =
      await ManufacturedQuantityStatisticsService.findByPeriodId(periodId);

    createResponse({ res, data: { manufacturedQuantityStatistics } });
  };

  public static getByProjectId = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const periods = await PeriodService.findByProjectId(projectId);

    const periodIds = periods.map(item => item.id);

    if (!periodIds.length) {
      createResponse({ res, data: { manufacturedQuantityStatistics: [] } });
      return;
    }

    const manufacturedQuantityStatistics =
      await ManufacturedQuantityStatisticsService.findByPeriodIds(periodIds);

    createResponse({ res, data: { manufacturedQuantityStatistics } });
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

    const manufacturedQuantityStatistics =
      await ManufacturedQuantityStatisticsService.create({
        ...req.body,
        periodId,
      });

    createResponse({
      res,
      data: { manufacturedQuantityStatistics },
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

    const manufacturedQuantityStatisticsToInsert = [];

    for (const item of req.body) {
      const product = await ProductService.findById(item.productId);
      if (!product || product.projectId !== projectId)
        throwError('Product not found', 404);
      manufacturedQuantityStatisticsToInsert.push({ ...item, periodId });
    }

    const manufacturedQuantityStatistics =
      await ManufacturedQuantityStatisticsService.createMany(
        manufacturedQuantityStatisticsToInsert,
      );

    createResponse({
      res,
      data: { manufacturedQuantityStatistics },
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

    const oldManufacturedQuantityStatistics =
      await ManufacturedQuantityStatisticsService.findById(id);
    if (
      !oldManufacturedQuantityStatistics ||
      oldManufacturedQuantityStatistics.periodId !== periodId
    )
      throwError('Item not found', 404);

    const manufacturedQuantityStatistics =
      await ManufacturedQuantityStatisticsService.update({ ...req.body }, id);

    createResponse({
      res,
      data: {
        manufacturedQuantityStatistics: {
          id: manufacturedQuantityStatistics.id,
          creationDate: manufacturedQuantityStatistics.creationDate,
          quantity: manufacturedQuantityStatistics.quantity,
          cost: manufacturedQuantityStatistics.cost,
          productId: manufacturedQuantityStatistics.productId,
          periodId: manufacturedQuantityStatistics.periodId,
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

    const oldManufacturedQuantityStatistics =
      await ManufacturedQuantityStatisticsService.findById(id);
    if (
      !oldManufacturedQuantityStatistics ||
      oldManufacturedQuantityStatistics.periodId !== periodId
    )
      throwError('Item not found', 404);

    const result = await ManufacturedQuantityStatisticsService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
