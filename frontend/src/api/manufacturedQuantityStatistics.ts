import { requestWrapper } from './utils';
import { APIResponse } from './types';
import { AxiosError } from 'axios';
import { API } from 'api';
import { ManufacturedQuantityStatisticsCreate } from 'store/manufacturedQuantityStatistics/manufacturedQuantityStatistics.types';

export default class ManufacturedQuantityStatisticsAPI {
  private static API_PATH_KEY = 'manufactured-quantity-statistics';

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
      manufacturedQuantityStatistics,
      periodId,
      projectId,
    }: {
      manufacturedQuantityStatistics: ManufacturedQuantityStatisticsCreate;
      periodId: string;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/periods/${periodId}/${this.API_PATH_KEY}`,
        manufacturedQuantityStatistics,
      );
      return response.data;
    },
  );

  public static createMany = requestWrapper(
    async ({
      manufacturedQuantityStatistics,
      periodId,
      projectId,
    }: {
      manufacturedQuantityStatistics: ManufacturedQuantityStatisticsCreate[];
      periodId: string;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/periods/${periodId}/${this.API_PATH_KEY}/many`,
        manufacturedQuantityStatistics,
      );
      return response.data;
    },
  );
}
