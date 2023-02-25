import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('income_statistics')
export class IncomeStatistics extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'creation_date', type: 'timestamptz' })
  public creationDate: Date;

  @Column({ name: 'quantity' })
  public quantity: number;

  @Column({ name: 'price' })
  public price: number;

  @Column({ name: 'product_id' })
  public productId: string;

  @Column({ name: 'period_id' })
  public periodId: string;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      creationDate: this.creationDate,
      quantity: this.quantity,
      price: this.price,
      product_id: this.productId,
      period_id: this.periodId,
    });
}
