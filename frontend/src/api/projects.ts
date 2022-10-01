import { ProjectCreate } from 'store/projects/projects.type';
import { requestWrapper } from './utils';
import { APIResponse } from './types';
import { AxiosError } from 'axios';
import { API } from 'api';

export default class ProjectsAPI {
  public static get = requestWrapper(
    async (): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get('/project');
      return response.data;
    },
  );

  public static create = requestWrapper(
    async (
      data: ProjectCreate,
    ): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post('/project', data);
      return response.data;
    },
  );
}
