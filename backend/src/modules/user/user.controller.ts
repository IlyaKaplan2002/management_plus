import createResponse from '@helpers/createRes';
import { Request } from '@types';
import { Response } from 'express';
import UserService from './user.service';

export default class UserController {
  public static update = async (req: Request, res: Response) => {
    const { id } = req.user;

    const result = await UserService.update(req.body, id);

    createResponse({
      res,
      data: {
        user: {
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
        },
      },
    });
  };
}
