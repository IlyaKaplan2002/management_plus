import { AxiosError } from 'axios';
import store from 'store';
import { authActions } from 'store/auth';
import { APIResponse } from './types';

export const requestWrapper =
  (req: (data?: any) => Promise<APIResponse | AxiosError<APIResponse>>) =>
  async (data?: any): Promise<APIResponse> => {
    try {
      const response = await req(data);
      return response as APIResponse;
    } catch (error: any) {
      if (error.response.data.message === 'jwt expired') {
        await store.dispatch(authActions.refreshToken());
        return requestWrapper(req)(data);
      }
      return error.response.data as APIResponse;
    }
  };
