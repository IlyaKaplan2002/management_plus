import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('planned_sell_quantity')
export class PlannedSellQuantity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'quantity' })
  public quantity: number;

  @Column({ name: 'product_id' })
  public productId: string;

  @Column({ name: 'period_id' })
  public periodId: string;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      quantity: this.quantity,
      product_id: this.productId,
      period_id: this.periodId,
    });
}
