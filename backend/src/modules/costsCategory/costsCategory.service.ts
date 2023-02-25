import { CostsCategory } from './costsCategory.entity';

export default class CostsCategoryService {
  public static create = async (data: CostsCategory) => {
    const costsCategory = await CostsCategory.save({ ...data });
    return costsCategory;
  };

  public static createMany = async (data: CostsCategory[]) => {
    const costsCategories = await CostsCategory.save(data);
    return costsCategories;
  };

  public static update = async (data: any, id: string) => {
    const result = await CostsCategory.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedCostsCategory = result.raw[0];

    const costsCategory = CostsCategory.create({
      id: returnedCostsCategory.id,
      name: returnedCostsCategory.name,
      projectId: returnedCostsCategory.project_id,
    });

    return costsCategory;
  };

  public static delete = async (id: string) => {
    await CostsCategory.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const costsCategory = await CostsCategory.findOneBy({ id });
    return costsCategory;
  };

  public static findByProjectId = async (projectId: string) => {
    const costsCategory = await CostsCategory.findBy({ projectId });
    return costsCategory;
  };
}
