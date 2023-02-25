import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'project_id' })
  public projectId: string;

  @Column({ name: 'price' })
  public price: number;

  @Column({ name: 'cost' })
  public cost: number;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      name: this.name,
      project_id: this.projectId,
      price: this.price,
      cost: this.cost,
    });
}
