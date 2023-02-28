import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import ProjectService from '@modules/project/project.service';
import PeriodService from '@modules/period/period.service';
import CostsCategoryService from '@modules/costsCategory/costsCategory.service';
import { Request } from '@types';
import { Response } from 'express';
import CostsStatisticsService from './costsStatistics.service';

export default class CostsStatisticsController {
  public static get = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, period: periodId } = req.params;
    const { category: categoryId } = req.query;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const period = await PeriodService.findById(periodId);
    if (!period || period.projectId !== projectId)
      throwError('Period not found', 404);

    if (categoryId && typeof categoryId === 'string') {
      const category = await CostsCategoryService.findById(categoryId);

      if (!category || category.projectId !== projectId)
        throwError('Category not found', 404);

      const costsStatistics =
        await CostsStatisticsService.findByPeriodIdAndCostsCategoryId(
          periodId,
          categoryId,
        );

      createResponse({ res, data: { costsStatistics } });
      return;
    }

    const costsStatistics = await CostsStatisticsService.findByPeriodId(
      periodId,
    );

    createResponse({ res, data: { costsStatistics } });
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
      createResponse({ res, data: { costsStatistics: [] } });
      return;
    }

    const costsStatistics = await CostsStatisticsService.findByPeriodIds(
      periodIds,
    );

    createResponse({ res, data: { costsStatistics } });
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

    const category = await CostsCategoryService.findById(
      req.body.costsCategoryId,
    );
    if (!category || category.projectId !== projectId)
      throwError('Category not found', 404);

    const costsStatistics = await CostsStatisticsService.create({
      ...req.body,
      periodId,
    });

    createResponse({
      res,
      data: { costsStatistics },
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

    const costsStatisticsToInsert = [];

    for (const item of req.body) {
      const category = await CostsCategoryService.findById(
        item.costsCategoryId,
      );
      if (!category || category.projectId !== projectId)
        throwError('Category not found', 404);
      costsStatisticsToInsert.push({ ...item, periodId });
    }

    const costsStatistics = await CostsStatisticsService.createMany(
      costsStatisticsToInsert,
    );

    createResponse({
      res,
      data: { costsStatistics },
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

    if (req.body.costsCategoryId) {
      const category = await CostsCategoryService.findById(
        req.body.costsCategoryId,
      );
      if (!category || category.projectId !== projectId)
        throwError('Category not found', 404);
    }

    const oldCostsStatistics = await CostsStatisticsService.findById(id);
    if (!oldCostsStatistics || oldCostsStatistics.periodId !== periodId)
      throwError('Item not found', 404);

    const costsStatistics = await CostsStatisticsService.update(
      { ...req.body },
      id,
    );

    createResponse({
      res,
      data: {
        costsStatistics: {
          id: costsStatistics.id,
          creationDate: costsStatistics.creationDate,
          costs: costsStatistics.costs,
          costsCategoryId: costsStatistics.costsCategoryId,
          periodId: costsStatistics.periodId,
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

    const oldCostsStatistics = await CostsStatisticsService.findById(id);
    if (!oldCostsStatistics || oldCostsStatistics.periodId !== periodId)
      throwError('Item not found', 404);

    const result = await CostsStatisticsService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
