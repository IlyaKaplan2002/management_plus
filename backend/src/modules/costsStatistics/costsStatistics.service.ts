import { CostsStatistics } from './costsStatistics.entity';

export default class CostsStatisticsService {
  public static create = async (data: CostsStatistics) => {
    const costsStatistics = await CostsStatistics.save({
      ...data,
    });
    return costsStatistics;
  };

  public static createMany = async (data: CostsStatistics[]) => {
    const costsStatistics = await CostsStatistics.save(data);
    return costsStatistics;
  };

  public static update = async (data: any, id: string) => {
    const result = await CostsStatistics.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedCostsStatistics = result.raw[0];

    const costsStatistics = CostsStatistics.create({
      id: returnedCostsStatistics.id,
      creationDate: returnedCostsStatistics.creationDate,
      costs: returnedCostsStatistics.costs,
      costsCategoryId: returnedCostsStatistics.costs_category_id,
      periodId: returnedCostsStatistics.period_id,
    });

    return costsStatistics;
  };

  public static delete = async (id: string) => {
    await CostsStatistics.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const costsStatistics = await CostsStatistics.findOneBy({
      id,
    });
    return costsStatistics;
  };

  public static findByPeriodId = async (periodId: string) => {
    const costsStatistics = await CostsStatistics.findBy({
      periodId,
    });
    return costsStatistics;
  };

  public static findByPeriodIdAndCostsCategoryId = async (
    periodId: string,
    costsCategoryId: string,
  ) => {
    const costsStatistics = await CostsStatistics.findBy({
      periodId,
      costsCategoryId,
    });
    return costsStatistics;
  };
}
