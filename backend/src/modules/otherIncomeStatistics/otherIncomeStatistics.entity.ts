import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('other_income_statistics')
export class OtherIncomeStatistics extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'creation_date', type: 'timestamptz' })
  public creationDate: Date;

  @Column({ name: 'income' })
  public income: number;

  @Column({ name: 'period_id' })
  public periodId: string;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      creationDate: this.creationDate,
      income: this.income,
      period_id: this.periodId,
    });
}
