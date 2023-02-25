import { Period } from './period.entity';

export default class PeriodService {
  public static create = async (data: Period) => {
    const period = await Period.save({ ...data });
    return period;
  };

  public static update = async (data: any, id: string) => {
    const result = await Period.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedPeriod = result.raw[0];

    const period = Period.create({
      id: returnedPeriod.id,
      startDate: returnedPeriod.start_date,
      endDate: returnedPeriod.end_date,
      projectId: returnedPeriod.project_id,
    });

    return period;
  };

  public static delete = async (id: string) => {
    await Period.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const period = await Period.findOneBy({ id });
    return period;
  };

  public static findByProjectId = async (projectId: string) => {
    const periods = await Period.findBy({ projectId });
    return periods;
  };
}
