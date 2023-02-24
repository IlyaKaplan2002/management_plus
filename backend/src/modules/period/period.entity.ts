import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Period extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'start_date', type: 'timestamptz' })
  public startDate: Date;

  @Column({ name: 'end_date', type: 'timestamptz' })
  public endDate: Date;

  @Column({ name: 'project_id' })
  public projectId: string;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      start_date: this.startDate,
      end_date: this.endDate,
      project_id: this.projectId,
    });
}
