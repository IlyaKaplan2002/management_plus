import { User } from './user.entity';

export default class UserService {
  public static create = async (data: User) => {
    const user = User.save(data);
    return user;
  };

  public static update = async (data: any, id: string) => {
    const result = await User.createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedUser = result.raw[0];

    const user = User.create({
      id: returnedUser.id,
      email: returnedUser.email,
      firstName: returnedUser.first_name,
      lastName: returnedUser.last_name,
      hash: returnedUser.password,
      token: returnedUser.token,
      refreshToken: returnedUser.refresh_token,
    });

    return user;
  };

  public static findByEmail = async (email: string) => {
    const user = await User.findOneBy({ email });
    return user;
  };

  public static findById = async (id: string) => {
    const user = await User.findOneBy({ id });
    return user;
  };
}
