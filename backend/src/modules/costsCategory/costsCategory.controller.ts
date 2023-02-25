import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import ProjectService from '@modules/project/project.service';
import { Request } from '@types';
import { Response } from 'express';
import { CostsCategory } from './costsCategory.entity';
import CostsCategoryService from './costsCategory.service';

export default class CostsCategoryController {
  public static get = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;
    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const costsCategories = await CostsCategoryService.findByProjectId(
      projectId,
    );

    createResponse({ res, data: { costsCategories } });
  };

  public static create = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;
    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const costsCategory = await CostsCategoryService.create({
      ...req.body,
      projectId,
    });

    createResponse({ res, data: { costsCategory }, code: 201 });
  };

  public static createMany = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;
    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const costsCategoriesToInsert = req.body.map((item: CostsCategory) => ({
      ...item,
      projectId,
    }));

    const costsCategories = await CostsCategoryService.createMany(
      costsCategoriesToInsert,
    );

    createResponse({ res, data: { costsCategories }, code: 201 });
  };

  public static update = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, id } = req.params;

    const project = await ProjectService.findById(projectId);
    const oldCostsCategory = await CostsCategoryService.findById(id);
    if (
      !project ||
      !oldCostsCategory ||
      oldCostsCategory.projectId !== projectId ||
      project.userId !== userId
    )
      throwError('Project not found', 404);

    const costsCategory = await CostsCategoryService.update(
      { ...req.body },
      id,
    );

    createResponse({
      res,
      data: {
        costsCategory: {
          id: costsCategory.id,
          name: costsCategory.name,
          projectId: costsCategory.projectId,
        },
      },
    });
  };

  public static delete = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, id } = req.params;

    const project = await ProjectService.findById(projectId);
    const oldCostsCategory = await CostsCategoryService.findById(id);
    if (
      !project ||
      !oldCostsCategory ||
      oldCostsCategory.projectId !== projectId ||
      project.userId !== userId
    )
      throwError('Project not found', 404);

    const result = await CostsCategoryService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
