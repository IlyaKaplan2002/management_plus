import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'description' })
  public description: string;

  @Column({ name: 'user_id' })
  public userId: string;

  @Column({ name: 'last_update', type: 'timestamptz' })
  public lastUpdate: Date;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      name: this.name,
      description: this.description,
      user_id: this.userId,
    });
}
