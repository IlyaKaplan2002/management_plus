import createResponse from '@helpers/createRes';
import { Response } from 'express';
import UserService from '../user/user.service';
import { getHashedValue, compareValues } from '@helpers/hashHelpers';
import { generateToken } from '@helpers/tokenHelpers';
import throwError from '@helpers/throwError';
import { Request } from '@types';

export default class AuthController {
  public static signUp = async (req: Request, res: Response) => {
    const hash = await getHashedValue(req.body.password);
    const user = await UserService.create({
      ...req.body,
      hash,
    });

    const token = generateToken(user.id);
    const refreshToken = generateToken(user.id, 2592000);

    const result = await UserService.update({ token, refreshToken }, user.id);

    createResponse({
      res,
      data: {
        user: {
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
        },
        token: result.token,
        refreshToken: result.refreshToken,
      },
    });
  };

  public static signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserService.findByEmail(email);
    if (!user) throwError('Email or password is wrong', 401);

    const passwordsCompare = await compareValues(password, user.hash);
    if (!passwordsCompare) throwError('Email or password is wrong', 401);

    const token = generateToken(user.id);
    const refreshToken = generateToken(user.id, 2592000);

    const result = await UserService.update({ token, refreshToken }, user.id);

    createResponse({
      res,
      data: {
        user: {
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
        },
        token: result.token,
        refreshToken: result.refreshToken,
      },
    });
  };

  public static signOut = async (req: Request, res: Response) => {
    const { user } = req;
    await UserService.update({ token: null, refreshToken: null }, user.id);
    createResponse({ res, code: 204 });
  };

  public static getCurrentUser = async (req: Request, res: Response) => {
    const { user } = req;

    createResponse({
      res,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token: user.token,
        refreshToken: user.refreshToken,
      },
    });
  };

  public static refreshToken = async (req: Request, res: Response) => {
    const { user } = req;

    const token = generateToken(user.id);
    const refreshToken = generateToken(user.id, 2592000);

    const result = await UserService.update({ token, refreshToken }, user.id);

    createResponse({
      res,
      data: {
        user: {
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
        },
        token: result.token,
        refreshToken: result.refreshToken,
      },
    });
  };
}
