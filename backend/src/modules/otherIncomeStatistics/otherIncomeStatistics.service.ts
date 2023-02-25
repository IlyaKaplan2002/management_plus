import { OtherIncomeStatistics } from './otherIncomeStatistics.entity';

export default class OtherIncomeStatisticsService {
  public static create = async (data: OtherIncomeStatistics) => {
    const otherIncomeStatistics = await OtherIncomeStatistics.save({ ...data });
    return otherIncomeStatistics;
  };

  public static update = async (data: any, id: string) => {
    const result = await OtherIncomeStatistics.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedOtherIncomeStatistics = result.raw[0];

    const otherIncomeStatistics = OtherIncomeStatistics.create({
      id: returnedOtherIncomeStatistics.id,
      creationDate: returnedOtherIncomeStatistics.creationDate,
      income: returnedOtherIncomeStatistics.income,
      periodId: returnedOtherIncomeStatistics.period_id,
    });

    return otherIncomeStatistics;
  };

  public static delete = async (id: string) => {
    await OtherIncomeStatistics.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const otherIncomeStatistics = await OtherIncomeStatistics.findOneBy({ id });
    return otherIncomeStatistics;
  };

  public static findByPeriodId = async (periodId: string) => {
    const otherIncomeStatistics = await OtherIncomeStatistics.findBy({
      periodId,
    });
    return otherIncomeStatistics;
  };
}
