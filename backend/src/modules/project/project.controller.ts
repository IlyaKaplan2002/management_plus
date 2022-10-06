import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import { Request } from '@types';
import { Response } from 'express';
import ProjectService from './project.service';

export default class ProjectController {
  public static get = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const projects = await ProjectService.findByUserId(userId);

    createResponse({ res, data: { projects } });
  };

  public static create = async (req: Request, res: Response) => {
    const project = await ProjectService.create({
      ...req.body,
      userId: req.user.id,
    });

    createResponse({ res, data: { project }, code: 201 });
  };

  public static update = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { id } = req.params;
    const oldProject = await ProjectService.findById(id);
    if (!oldProject || oldProject.userId !== userId)
      throwError('Project not found', 404);
    const project = await ProjectService.update({ ...req.body }, id);

    createResponse({
      res,
      data: {
        project: {
          id: project.id,
          name: project.name,
          description: project.description,
          userId: project.userId,
        },
      },
    });
  };

  public static delete = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { id } = req.params;
    const project = await ProjectService.findById(id);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);
    const result = await ProjectService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
