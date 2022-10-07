import { API } from 'api';
import { AxiosError } from 'axios';
import { StatisticsCreate } from 'store/statistics/statistics.types';
import { APIResponse } from './types';
import { requestWrapper } from './utils';

export default class StatisticsAPI {
  public static get = requestWrapper(
    async (
      projectId: string,
    ): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get(`/projects/${projectId}/statistics`);
      return response.data;
    },
  );

  public static create = requestWrapper(
    async ({
      projectId,
      data,
    }: {
      projectId: string;
      data: StatisticsCreate;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/statistics`,
        data,
      );
      return response.data;
    },
  );
}
