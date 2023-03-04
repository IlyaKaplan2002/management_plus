import { requestWrapper } from './utils';
import { APIResponse } from './types';
import { AxiosError } from 'axios';
import { API } from 'api';
import { OtherIncomeStatisticsCreate } from 'store/otherIncomeStatistics/otherIncomeStatistics.types';

export default class OtherIncomeStatisticsAPI {
  private static API_PATH_KEY = 'other-income-statistics';

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
      otherIncomeStatistics,
      periodId,
      projectId,
    }: {
      otherIncomeStatistics: OtherIncomeStatisticsCreate;
      periodId: string;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/periods/${periodId}/${this.API_PATH_KEY}`,
        otherIncomeStatistics,
      );
      return response.data;
    },
  );
}
