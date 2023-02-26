import createResponse from '@helpers/createRes';
import throwError from '@helpers/throwError';
import ProjectService from '@modules/project/project.service';
import { Request } from '@types';
import { Response } from 'express';
import { Product } from './product.entity';
import ProductService from './product.service';

export default class ProductController {
  public static get = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;
    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const products = await ProductService.findByProjectId(projectId);

    createResponse({ res, data: { products } });
  };

  public static create = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;
    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const product = await ProductService.create({
      ...req.body,
      projectId,
    });

    createResponse({ res, data: { product }, code: 201 });
  };

  public static createMany = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId } = req.params;
    const project = await ProjectService.findById(projectId);
    if (!project || project.userId !== userId)
      throwError('Project not found', 404);

    const productsToInsert = req.body.map((item: Product) => ({
      ...item,
      projectId,
    }));

    const products = await ProductService.createMany(productsToInsert);

    createResponse({ res, data: { products }, code: 201 });
  };

  public static update = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, id } = req.params;

    const project = await ProjectService.findById(projectId);
    const oldProduct = await ProductService.findById(id);
    if (
      !project ||
      !oldProduct ||
      oldProduct.projectId !== projectId ||
      project.userId !== userId
    )
      throwError('Project not found', 404);

    const product = await ProductService.update({ ...req.body }, id);

    createResponse({
      res,
      data: {
        product: {
          id: product.id,
          name: product.name,
          cost: product.cost,
          price: product.price,
          projectId: product.projectId,
        },
      },
    });
  };

  public static delete = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { project: projectId, id } = req.params;

    const project = await ProjectService.findById(projectId);
    const oldProduct = await ProductService.findById(id);
    if (
      !project ||
      !oldProduct ||
      oldProduct.projectId !== projectId ||
      project.userId !== userId
    )
      throwError('Project not found', 404);

    const result = await ProductService.delete(id);
    if (!result) throwError('Failed', 500);

    createResponse({ res, code: 204, data: null });
  };
}
