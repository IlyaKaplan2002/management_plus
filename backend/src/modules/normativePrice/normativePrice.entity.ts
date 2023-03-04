import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('normative_price')
export class NormativePrice extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'price' })
  public price: number;

  @Column({ name: 'period_id' })
  public periodId: string;

  @Column({ name: 'product_id' })
  public productId: string;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      price: this.price,
      period_id: this.periodId,
      product_id: this.productId,
    });
}
