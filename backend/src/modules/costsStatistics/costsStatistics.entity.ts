import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('costs_statistics')
export class CostsStatistics extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'creation_date', type: 'timestamptz' })
  public creationDate: Date;

  @Column({ name: 'costs' })
  public costs: number;

  @Column({ name: 'costs_category_id' })
  public costsCategoryId: string;

  @Column({ name: 'period_id' })
  public periodId: string;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      creationDate: this.creationDate,
      costs: this.costs,
      costsCategoryId: this.costsCategoryId,
      period_id: this.periodId,
    });
}
