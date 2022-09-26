import { API } from 'api';
import { AxiosError } from 'axios';
import { LoginProps } from '../store/auth/auth.types';
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
}
