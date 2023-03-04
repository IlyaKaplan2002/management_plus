import { PlannedSellQuantity } from './plannedSellQuantity.entity';

export default class PlannedSellQuantityService {
  public static create = async (data: PlannedSellQuantity) => {
    const plannedSellQuantity = await PlannedSellQuantity.save({ ...data });
    return plannedSellQuantity;
  };

  public static createMany = async (data: PlannedSellQuantity[]) => {
    const plannedSellQuantities = await PlannedSellQuantity.save(data);
    return plannedSellQuantities;
  };

  public static update = async (data: any, id: string) => {
    const result = await PlannedSellQuantity.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedPlannedSellQuantity = result.raw[0];

    const plannedSellQuantity = PlannedSellQuantity.create({
      id: returnedPlannedSellQuantity.id,
      quantity: returnedPlannedSellQuantity.quantity,
      productId: returnedPlannedSellQuantity.product_id,
      periodId: returnedPlannedSellQuantity.period_id,
    });

    return plannedSellQuantity;
  };

  public static delete = async (id: string) => {
    await PlannedSellQuantity.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const plannedSellQuantity = await PlannedSellQuantity.findOneBy({ id });
    return plannedSellQuantity;
  };

  public static findByPeriodId = async (periodId: string) => {
    const plannedSellQuantities = await PlannedSellQuantity.findBy({
      periodId,
    });
    return plannedSellQuantities;
  };

  public static findByPeriodIds = async (periodIds: string[]) => {
    const plannedSellQuantities = await PlannedSellQuantity.createQueryBuilder()
      .where('period_id IN (:...periodIds)', { periodIds })
      .getMany();
    return plannedSellQuantities;
  };

  public static findByPeriodIdAndProductId = async (
    periodId: string,
    productId: string,
  ) => {
    const plannedSellQuantities = await PlannedSellQuantity.findBy({
      periodId,
      productId,
    });
    return plannedSellQuantities;
  };
}
