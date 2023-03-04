import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import ProjectService from '@modules/project/project.service';
import { Request } from '@types';
import { Response } from 'express';
import StatisticsService from './statistics.service';

export default class StatisticsController {
  public static get = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;
    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const statistics = await StatisticsService.findByProjectId(projectId);

    createResponse({ res, data: { statistics } });
  };

  public static create = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;
    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const statistics = await StatisticsService.create({
      ...req.body,
      date: new Date(req.body.date),
      projectId,
    });

    createResponse({ res, data: { statistics }, code: 201 });
  };

  public static update = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, id } = req.params;

    const project = await ProjectService.findById(projectId);
    const oldStatisics = await StatisticsService.findById(id);
    if (
      !project ||
      !oldStatisics ||
      oldStatisics.projectId !== projectId ||
      project.userId !== userId
    )
      throwError('Project not found', 404);

    const statistics = await StatisticsService.update({ ...req.body }, id);

    createResponse({
      res,
      data: {
        statistics: {
          id: statistics.id,
          costs: statistics.costs,
          incomes: statistics.incomes,
          date: statistics.date,
          projectId: statistics.projectId,
        },
      },
    });
  };

  public static delete = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, id } = req.params;

    const project = await ProjectService.findById(projectId);
    const oldStatisics = await StatisticsService.findById(id);
    if (
      !project ||
      !oldStatisics ||
      oldStatisics.projectId !== projectId ||
      project.userId !== userId
    )
      throwError('Project not found', 404);

    const result = await StatisticsService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
