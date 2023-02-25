import { IncomeStatistics } from './incomeStatistics.entity';

export default class IncomeStatisticsService {
  public static create = async (data: IncomeStatistics) => {
    const incomeStatistics = await IncomeStatistics.save({
      ...data,
    });
    return incomeStatistics;
  };

  public static createMany = async (data: IncomeStatistics[]) => {
    const incomeStatistics = await IncomeStatistics.save(data);
    return incomeStatistics;
  };

  public static update = async (data: any, id: string) => {
    const result = await IncomeStatistics.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedIncomeStatistics = result.raw[0];

    const incomeStatistics = IncomeStatistics.create({
      id: returnedIncomeStatistics.id,
      creationDate: returnedIncomeStatistics.creationDate,
      quantity: returnedIncomeStatistics.quantity,
      price: returnedIncomeStatistics.price,
      productId: returnedIncomeStatistics.product_id,
      periodId: returnedIncomeStatistics.period_id,
    });

    return incomeStatistics;
  };

  public static delete = async (id: string) => {
    await IncomeStatistics.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const incomeStatistics = await IncomeStatistics.findOneBy({
      id,
    });
    return incomeStatistics;
  };

  public static findByPeriodId = async (periodId: string) => {
    const incomeStatistics = await IncomeStatistics.findBy({
      periodId,
    });
    return incomeStatistics;
  };

  public static findByPeriodIdAndProductId = async (
    periodId: string,
    productId: string,
  ) => {
    const incomeStatistics = await IncomeStatistics.findBy({
      periodId,
      productId,
    });
    return incomeStatistics;
  };
}
