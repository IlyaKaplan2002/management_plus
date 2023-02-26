import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import ProjectService from '@modules/project/project.service';
import PeriodService from '@modules/period/period.service';
import ProductService from '@modules/product/product.service';
import { Request } from '@types';
import { Response } from 'express';
import PlannedSellQuantityService from './plannedSellQuantity.service';

export default class PlannedSellQuantityController {
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

      const plannedSellQuantities =
        await PlannedSellQuantityService.findByPeriodIdAndProductId(
          periodId,
          productId,
        );

      createResponse({ res, data: { plannedSellQuantities } });
      return;
    }

    const plannedSellQuantities =
      await PlannedSellQuantityService.findByPeriodId(periodId);

    createResponse({ res, data: { plannedSellQuantities } });
  };

  public static getByProjectId = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const periods = await PeriodService.findByProjectId(projectId);

    const periodIds = periods.map(item => item.id);

    const plannedSellQuantities =
      await PlannedSellQuantityService.findByPeriodIds(periodIds);

    createResponse({ res, data: { plannedSellQuantities } });
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

    const plannedSellQuantity = await PlannedSellQuantityService.create({
      ...req.body,
      periodId,
    });

    createResponse({ res, data: { plannedSellQuantity }, code: 201 });
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

    const plannedSellQuantitiesToInsert = [];

    for (const item of req.body) {
      const product = await ProductService.findById(item.productId);
      if (!product || product.projectId !== projectId)
        throwError('Product not found', 404);
      plannedSellQuantitiesToInsert.push({ ...item, periodId });
    }

    const plannedSellQuantities = await PlannedSellQuantityService.createMany(
      plannedSellQuantitiesToInsert,
    );

    createResponse({ res, data: { plannedSellQuantities }, code: 201 });
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

    const oldPlannedSellQuantity = await PlannedSellQuantityService.findById(
      id,
    );
    if (!oldPlannedSellQuantity || oldPlannedSellQuantity.periodId !== periodId)
      throwError('Item not found', 404);

    const plannedSellQuantity = await PlannedSellQuantityService.update(
      { ...req.body },
      id,
    );

    createResponse({
      res,
      data: {
        plannedSellQuantity: {
          id: plannedSellQuantity.id,
          quantity: plannedSellQuantity.quantity,
          productId: plannedSellQuantity.productId,
          periodId: plannedSellQuantity.periodId,
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

    const oldPlannedSellQuantity = await PlannedSellQuantityService.findById(
      id,
    );
    if (!oldPlannedSellQuantity || oldPlannedSellQuantity.periodId !== periodId)
      throwError('Item not found', 404);

    const result = await PlannedSellQuantityService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
