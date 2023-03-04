import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import ProjectService from '@modules/project/project.service';
import PeriodService from '@modules/period/period.service';
import ProductService from '@modules/product/product.service';
import { Request } from '@types';
import { Response } from 'express';
import NormativePriceService from './normativePrice.service';

export default class NormativePriceController {
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

      const normativePrices =
        await NormativePriceService.findByPeriodIdAndProductId(
          periodId,
          productId,
        );

      createResponse({ res, data: { normativePrices } });
      return;
    }

    const normativePrices = await NormativePriceService.findByPeriodId(
      periodId,
    );

    createResponse({ res, data: { normativePrices } });
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
      createResponse({ res, data: { normativePrices: [] } });
      return;
    }

    const normativePrices = await NormativePriceService.findByPeriodIds(
      periodIds,
    );

    createResponse({ res, data: { normativePrices } });
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

    const normativePrice = await NormativePriceService.create({
      ...req.body,
      periodId,
    });

    createResponse({ res, data: { normativePrice }, code: 201 });
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

    const normativePricesToInsert = [];

    for (const item of req.body) {
      const product = await ProductService.findById(item.productId);
      if (!product || product.projectId !== projectId)
        throwError('Product not found', 404);
      normativePricesToInsert.push({ ...item, periodId });
    }

    const normativePrices = await NormativePriceService.createMany(
      normativePricesToInsert,
    );

    createResponse({ res, data: { normativePrices }, code: 201 });
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

    const oldNormativePrice = await NormativePriceService.findById(id);
    if (!oldNormativePrice || oldNormativePrice.periodId !== periodId)
      throwError('Item not found', 404);

    const normativePrice = await NormativePriceService.update(
      { ...req.body },
      id,
    );

    createResponse({
      res,
      data: {
        normativePrice: {
          id: normativePrice.id,
          price: normativePrice.price,
          productId: normativePrice.productId,
          periodId: normativePrice.periodId,
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

    const oldNormativePrice = await NormativePriceService.findById(id);
    if (!oldNormativePrice || oldNormativePrice.periodId !== periodId)
      throwError('Item not found', 404);

    const result = await NormativePriceService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
