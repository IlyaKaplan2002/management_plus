import { Product } from './product.entity';

export default class ProductService {
  public static create = async (data: Product) => {
    const product = await Product.save({ ...data });
    return product;
  };

  public static createMany = async (data: Product[]) => {
    const products = await Product.save(data);
    return products;
  };

  public static update = async (data: any, id: string) => {
    const result = await Product.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedProduct = result.raw[0];

    const product = Product.create({
      id: returnedProduct.id,
      name: returnedProduct.name,
      projectId: returnedProduct.project_id,
      price: returnedProduct.price,
      cost: returnedProduct.cost,
    });

    return product;
  };

  public static delete = async (id: string) => {
    await Product.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const product = await Product.findOneBy({ id });
    return product;
  };

  public static findByProjectId = async (projectId: string) => {
    const products = await Product.findBy({ projectId });
    return products;
  };
}
