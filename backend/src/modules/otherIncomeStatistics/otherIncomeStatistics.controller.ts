import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import ProjectService from '@modules/project/project.service';
import PeriodService from '@modules/period/period.service';
import { Request } from '@types';
import { Response } from 'express';
import OtherIncomeStatisticsService from './otherIncomeStatistics.service';

export default class OtherIncomeStatisticsController {
  public static get = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, period: periodId } = req.params;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const period = await PeriodService.findById(periodId);
    if (!period || period.projectId !== projectId)
      throwError('Period not found', 404);

    const otherIncomeStatistics =
      await OtherIncomeStatisticsService.findByPeriodId(periodId);

    createResponse({ res, data: { otherIncomeStatistics } });
  };

  public static getByProjectId = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;

    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const periods = await PeriodService.findByProjectId(projectId);

    const periodIds = periods.map(item => item.id);

    const otherIncomeStatistics =
      await OtherIncomeStatisticsService.findByPeriodIds(periodIds);

    createResponse({ res, data: { otherIncomeStatistics } });
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

    const otherIncomeStatistics = await OtherIncomeStatisticsService.create({
      ...req.body,
      periodId,
    });

    createResponse({ res, data: { otherIncomeStatistics }, code: 201 });
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

    const oldOtherIncomeStatistics =
      await OtherIncomeStatisticsService.findById(id);
    if (
      !oldOtherIncomeStatistics ||
      oldOtherIncomeStatistics.periodId !== periodId
    )
      throwError('Item not found', 404);

    const otherIncomeStatistics = await OtherIncomeStatisticsService.update(
      { ...req.body },
      id,
    );

    createResponse({
      res,
      data: {
        otherIncomeStatistics: {
          id: otherIncomeStatistics.id,
          creationDate: otherIncomeStatistics.creationDate,
          income: otherIncomeStatistics.income,
          periodId: otherIncomeStatistics.periodId,
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

    const oldOtherIncomeStatistics =
      await OtherIncomeStatisticsService.findById(id);
    if (
      !oldOtherIncomeStatistics ||
      oldOtherIncomeStatistics.periodId !== periodId
    )
      throwError('Item not found', 404);

    const result = await OtherIncomeStatisticsService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
