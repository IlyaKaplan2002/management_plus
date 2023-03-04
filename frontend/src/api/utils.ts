import { AxiosError } from 'axios';
import store from 'store';
import { authActions } from 'store/auth';
import { APIResponse } from './types';
import { setToken } from './index';

const waitUntilTokenRefreshing = async () => {
  if (store.getState().auth.refreshing) {
    setTimeout(() => {
      waitUntilTokenRefreshing();
    }, 100);
  } else {
    await store.dispatch(authActions.refreshToken());
  }
};

export const requestWrapper =
  (req: (data?: any) => Promise<APIResponse | AxiosError<APIResponse>>) =>
  async (data?: any): Promise<APIResponse> => {
    try {
      const response = await req(data);
      return response as APIResponse;
    } catch (error: any) {
      if (error.response.data.message === 'jwt expired') {
        await waitUntilTokenRefreshing();
        if (store.getState().auth.token)
          setToken(store.getState().auth.token as string);
        return requestWrapper(req)(data);
      }
      return error.response.data as APIResponse;
    }
  };
