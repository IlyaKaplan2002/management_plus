import { NormativePrice } from './normativePrice.entity';

export default class NormativePriceService {
  public static create = async (data: NormativePrice) => {
    const normativePrice = await NormativePrice.save({ ...data });
    return normativePrice;
  };

  public static createMany = async (data: NormativePrice[]) => {
    const normativePrices = await NormativePrice.save(data);
    return normativePrices;
  };

  public static update = async (data: any, id: string) => {
    const result = await NormativePrice.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedNormativePrice = result.raw[0];

    const normativePrice = NormativePrice.create({
      id: returnedNormativePrice.id,
      price: returnedNormativePrice.price,
      productId: returnedNormativePrice.product_id,
      periodId: returnedNormativePrice.period_id,
    });

    return normativePrice;
  };

  public static delete = async (id: string) => {
    await NormativePrice.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const normativePrice = await NormativePrice.findOneBy({ id });
    return normativePrice;
  };

  public static findByPeriodId = async (periodId: string) => {
    const normativePrices = await NormativePrice.findBy({
      periodId,
    });
    return normativePrices;
  };

  public static findByPeriodIds = async (periodIds: string[]) => {
    const normativePrices = await NormativePrice.createQueryBuilder()
      .where('period_id IN (:...periodIds)', { periodIds })
      .getMany();
    return normativePrices;
  };

  public static findByPeriodIdAndProductId = async (
    periodId: string,
    productId: string,
  ) => {
    const normativePrices = await NormativePrice.findBy({
      periodId,
      productId,
    });
    return normativePrices;
  };
}
