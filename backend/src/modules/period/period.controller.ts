import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import ProjectService from '@modules/project/project.service';
import { Request } from '@types';
import { Response } from 'express';
import PeriodService from './period.service';

export default class PeriodController {
  public static get = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;
    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const periods = await PeriodService.findByProjectId(projectId);

    createResponse({ res, data: { periods } });
  };

  public static create = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;
    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const period = await PeriodService.create({
      ...req.body,
      projectId,
    });

    createResponse({ res, data: { period }, code: 201 });
  };

  public static update = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, id } = req.params;

    const project = await ProjectService.findById(projectId);
    const oldPeriod = await PeriodService.findById(id);
    if (
      !project ||
      !oldPeriod ||
      oldPeriod.projectId !== projectId ||
      project.userId !== userId
    )
      throwError('Project not found', 404);

    const period = await PeriodService.update({ ...req.body }, id);

    createResponse({
      res,
      data: {
        period: {
          id: period.id,
          startDate: period.startDate,
          endDate: period.endDate,
          projectId: period.projectId,
        },
      },
    });
  };

  public static delete = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, id } = req.params;

    const project = await ProjectService.findById(projectId);
    const oldPeriod = await PeriodService.findById(id);
    if (
      !project ||
      !oldPeriod ||
      oldPeriod.projectId !== projectId ||
      project.userId !== userId
    )
      throwError('Project not found', 404);

    const result = await PeriodService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
