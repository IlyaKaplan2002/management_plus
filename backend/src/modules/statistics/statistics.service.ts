import { Statistics } from './statistics.entity';

export default class StatisticsService {
  public static create = async (data: Statistics) => {
    const statistics = await Statistics.save({ ...data });
    return statistics;
  };

  public static update = async (data: any, id: string) => {
    const result = await Statistics.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedStatistics = result.raw[0];

    const statistics = Statistics.create({
      id: returnedStatistics.id,
      projectId: returnedStatistics.project_id,
      costs: returnedStatistics.costs,
      incomes: returnedStatistics.incomes,
      date: returnedStatistics.date,
    });

    return statistics;
  };

  public static delete = async (id: string) => {
    await Statistics.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const statistics = await Statistics.findOneBy({ id });
    return statistics;
  };

  public static findByProjectId = async (projectId: string) => {
    const statistics = await Statistics.findBy({ projectId });
    return statistics.sort((a, b) => b.date.getTime() - a.date.getTime());
  };
}
