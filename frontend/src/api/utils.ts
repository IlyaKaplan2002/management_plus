import { AxiosError } from 'axios';
import { APIResponse } from './types';

export const requestWrapper =
  (req: (data: any) => Promise<APIResponse | AxiosError<APIResponse>>) =>
  async (data: any) => {
    try {
      const response = await req(data);
      return response as APIResponse;
    } catch (error: any) {
      return error.response.data as APIResponse;
    }
  };
