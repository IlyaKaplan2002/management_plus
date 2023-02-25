import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statistics')
export class Statistics extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'project_id' })
  public projectId: string;

  @Column({ name: 'costs' })
  public costs: number;

  @Column({ name: 'incomes' })
  public incomes: number;

  @Column({ name: 'date', type: 'timestamptz' })
  public date: Date;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      project_id: this.projectId,
      costs: this.costs,
      incomes: this.incomes,
      date: this.date,
    });
}
