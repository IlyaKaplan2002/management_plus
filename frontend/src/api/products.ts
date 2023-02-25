import { requestWrapper } from './utils';
import { APIResponse } from './types';
import { AxiosError } from 'axios';
import { API } from 'api';
import { ProductCreate } from 'store/products/products.types';

export default class ProjectsAPI {
  public static get = requestWrapper(
    async (
      projectId: string,
    ): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get(`/projects/${projectId}/products`);
      return response.data;
    },
  );

  public static create = requestWrapper(
    async ({
      product,
      projectId,
    }: {
      product: ProductCreate;
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/products`,
        product,
      );
      return response.data;
    },
  );

  public static createMany = requestWrapper(
    async ({
      products,
      projectId,
    }: {
      products: ProductCreate[];
      projectId: string;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post(
        `/projects/${projectId}/products/many`,
        products,
      );
      return response.data;
    },
  );
}
