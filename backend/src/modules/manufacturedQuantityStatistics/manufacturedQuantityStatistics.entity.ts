import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('manufactured_quantity_statistics')
export class ManufacturedQuantityStatistics extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'creation_date', type: 'timestamptz' })
  public creationDate: Date;

  @Column({ name: 'quantity' })
  public quantity: number;

  @Column({ name: 'cost' })
  public cost: number;

  @Column({ name: 'product_id' })
  public productId: string;

  @Column({ name: 'period_id' })
  public periodId: string;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      creationDate: this.creationDate,
      quantity: this.quantity,
      cost: this.cost,
      product_id: this.productId,
      period_id: this.periodId,
    });
}
