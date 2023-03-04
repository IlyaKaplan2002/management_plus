import { requestWrapper } from './utils';
import { APIResponse } from './types';
import { AxiosError } from 'axios';
import { API } from 'api';
import { IncomeStatisticsCreate } from 'store/incomeStatistics/incomeStatistics.types';

export default class IncomeStatisticsAPI {
  private static API_PATH_KEY = 'income-statistics';

  public static get = requestWrapper(
    async ({
      projectId,
      periodId,
    }: {
      projectId: string;
      periodId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get(
        `/projects/${projectId}/periods/${periodId}/${this.API_PATH_KEY}`,
      );
      return response.data;
    },
  );

  public static getByProjectId = requestWrapper(
    async ({
      projectId,
    }: {
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get(
        `/projects/${projectId}/${this.API_PATH_KEY}`,
      );
      return response.data;
    },
  );

  public static create = requestWrapper(
    async ({
      incomeStatistics,
      periodId,
      projectId,
    }: {
      incomeStatistics: IncomeStatisticsCreate;
      periodId: string;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/periods/${periodId}/${this.API_PATH_KEY}`,
        incomeStatistics,
      );
      return response.data;
    },
  );

  public static createMany = requestWrapper(
    async ({
      incomeStatistics,
      periodId,
      projectId,
    }: {
      incomeStatistics: IncomeStatisticsCreate[];
      periodId: string;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/periods/${periodId}/${this.API_PATH_KEY}/many`,
        incomeStatistics,
      );
      return response.data;
    },
  );
}
