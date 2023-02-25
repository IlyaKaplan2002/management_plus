import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('costs_category')
export class CostsCategory extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'project_id' })
  public projectId: string;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      name: this.name,
      project_id: this.projectId,
    });
}
