import { API } from 'api';
import { AxiosError } from 'axios';
import { LoginProps, RegisterProps } from '../store/auth/auth.types';
import { APIResponse } from './types';
import { requestWrapper } from './utils';

export default class AuthAPI {
  public static login = requestWrapper(
    async (
      data: LoginProps,
    ): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post('/auth/signin', data);
      return response.data;
    },
  );

  public static register = requestWrapper(
    async (
      data: RegisterProps,
    ): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post('/auth/signup', data);
      return response.data;
    },
  );

  public static getCurrentUser = requestWrapper(
    async (): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get('/auth');
      return response.data;
    },
  );

  public static refreshToken = requestWrapper(
    async (): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get('/auth/refresh');
      return response.data;
    },
  );

  public static logout = requestWrapper(
    async (): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get('/auth/signout');
      return response.data;
    },
  );
}
