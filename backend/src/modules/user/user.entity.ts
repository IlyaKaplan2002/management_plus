import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'email' })
  public email: string;

  @Column({ name: 'password' })
  public hash: string;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ name: 'token' })
  public token: string | null;

  @Column({ name: 'refresh_token' })
  public refreshToken: string | null;

  public toJSON = () =>
    JSON.stringify({
      id: this.id,
      email: this.email,
      password: this.hash,
      first_name: this.firstName,
      last_name: this.lastName,
      token: this.token,
      refresh_token: this.refreshToken,
    });
}
