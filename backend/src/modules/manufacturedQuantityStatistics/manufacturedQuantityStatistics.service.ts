import { ManufacturedQuantityStatistics } from './manufacturedQuantityStatistics.entity';

export default class ManufacturedQuantityStatisticsService {
  public static create = async (data: ManufacturedQuantityStatistics) => {
    const manufacturedQuantityStatistics =
      await ManufacturedQuantityStatistics.save({
        ...data,
      });
    return manufacturedQuantityStatistics;
  };

  public static createMany = async (data: ManufacturedQuantityStatistics[]) => {
    const manufacturedQuantityStatistics =
      await ManufacturedQuantityStatistics.save(data);
    return manufacturedQuantityStatistics;
  };

  public static update = async (data: any, id: string) => {
    const result = await ManufacturedQuantityStatistics.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedManufacturedQuantityStatistics = result.raw[0];

    const manufacturedQuantityStatistics =
      ManufacturedQuantityStatistics.create({
        id: returnedManufacturedQuantityStatistics.id,
        creationDate: returnedManufacturedQuantityStatistics.creationDate,
        quantity: returnedManufacturedQuantityStatistics.quantity,
        cost: returnedManufacturedQuantityStatistics.cost,
        productId: returnedManufacturedQuantityStatistics.product_id,
        periodId: returnedManufacturedQuantityStatistics.period_id,
      });

    return manufacturedQuantityStatistics;
  };

  public static delete = async (id: string) => {
    await ManufacturedQuantityStatistics.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const manufacturedQuantityStatistics =
      await ManufacturedQuantityStatistics.findOneBy({
        id,
      });
    return manufacturedQuantityStatistics;
  };

  public static findByPeriodId = async (periodId: string) => {
    const manufacturedQuantityStatistics =
      await ManufacturedQuantityStatistics.findBy({
        periodId,
      });
    return manufacturedQuantityStatistics;
  };

  public static findByPeriodIdAndProductId = async (
    periodId: string,
    productId: string,
  ) => {
    const manufacturedQuantityStatistics =
      await ManufacturedQuantityStatistics.findBy({
        periodId,
        productId,
      });
    return manufacturedQuantityStatistics;
  };
}
