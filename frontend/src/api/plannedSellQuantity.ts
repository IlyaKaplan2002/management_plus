import { requestWrapper } from './utils';
import { APIResponse } from './types';
import { AxiosError } from 'axios';
import { API } from 'api';
import {
  PlannedSellQuantityCreate,
  PlannedSellQuantityUpdate,
} from 'store/plannedSellQuantity/plannedSellQuantity.types';

export default class plannedSellQuantityAPI {
  private static API_PATH_KEY = 'planned-sell-quantities';

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
      plannedSellQuantity,
      periodId,
      projectId,
    }: {
      plannedSellQuantity: PlannedSellQuantityCreate;
      periodId: string;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/periods/${periodId}/${this.API_PATH_KEY}`,
        plannedSellQuantity,
      );
      return response.data;
    },
  );

  public static update = requestWrapper(
    async ({
      plannedSellQuantity,
      projectId,
      periodId,
      plannedSellQuantityId,
    }: {
      plannedSellQuantity: PlannedSellQuantityUpdate;
      periodId: string;
      projectId: string;
      plannedSellQuantityId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.put(
        `/projects/${projectId}/periods/${periodId}/${this.API_PATH_KEY}/${plannedSellQuantityId}`,
        plannedSellQuantity,
      );
      return response.data;
    },
  );
}
