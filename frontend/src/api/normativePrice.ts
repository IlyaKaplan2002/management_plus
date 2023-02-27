import { requestWrapper } from './utils';
import { APIResponse } from './types';
import { AxiosError } from 'axios';
import { API } from 'api';
import {
  NormativePriceCreate,
  NormativePriceUpdate,
} from 'store/normativePrice/normativePrice.types';

export default class NormativePriceAPI {
  private static API_PATH_KEY = 'normative-prices';

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
      normativePrice,
      periodId,
      projectId,
    }: {
      normativePrice: NormativePriceCreate;
      periodId: string;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/periods/${periodId}/${this.API_PATH_KEY}`,
        normativePrice,
      );
      return response.data;
    },
  );

  public static update = requestWrapper(
    async ({
      normativePrice,
      projectId,
      periodId,
      normativePriceId,
    }: {
      normativePrice: NormativePriceUpdate;
      periodId: string;
      projectId: string;
      normativePriceId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.put(
        `/projects/${projectId}/periods/${periodId}/${this.API_PATH_KEY}/${normativePriceId}`,
        normativePrice,
      );
      return response.data;
    },
  );
}
