import { requestWrapper } from './utils';
import { APIResponse } from './types';
import { AxiosError } from 'axios';
import { API } from 'api';
import { PeriodCreate, PeriodUpdate } from 'store/periods/periods.types';

export default class PeriodsAPI {
  public static get = requestWrapper(
    async (
      projectId: string,
    ): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get(`/projects/${projectId}/periods`);
      return response.data;
    },
  );

  public static create = requestWrapper(
    async ({
      period,
      projectId,
    }: {
      period: PeriodCreate;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(`/projects/${projectId}/periods`, period);
      return response.data;
    },
  );

  public static update = requestWrapper(
    async ({
      period,
      projectId,
      periodId,
    }: {
      periodId: string;
      period: PeriodUpdate;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.put(
        `/projects/${projectId}/periods/${periodId}`,
        period,
      );
      return response.data;
    },
  );
}
