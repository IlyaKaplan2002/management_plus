import { requestWrapper } from './utils';
import { APIResponse } from './types';
import { AxiosError } from 'axios';
import { API } from 'api';
import { CostsCategoryCreate } from 'store/costsCategories/costsCategories.types';

export default class ProjectsAPI {
  private static API_PATH_KEY = 'costs-category';

  public static get = requestWrapper(
    async (
      projectId: string,
    ): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get(
        `/projects/${projectId}/${this.API_PATH_KEY}`,
      );
      return response.data;
    },
  );

  public static create = requestWrapper(
    async ({
      costsCategory,
      projectId,
    }: {
      costsCategory: CostsCategoryCreate;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/${this.API_PATH_KEY}`,
        costsCategory,
      );
      return response.data;
    },
  );

  public static createMany = requestWrapper(
    async ({
      costsCategories,
      projectId,
    }: {
      costsCategories: CostsCategoryCreate[];
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/${this.API_PATH_KEY}/many`,
        costsCategories,
      );
      return response.data;
    },
  );

  public static delete = requestWrapper(
    async ({
      projectId,
      costsCategoryId,
    }: {
      projectId: string;
      costsCategoryId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.delete(
        `/projects/${projectId}/${this.API_PATH_KEY}/${costsCategoryId}`,
      );
      return response.data;
    },
  );
}
