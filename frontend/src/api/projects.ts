import { ProjectCreate } from 'store/projects/projects.types';
import { requestWrapper } from './utils';
import { APIResponse } from './types';
import { AxiosError } from 'axios';
import { API } from 'api';

export default class ProjectsAPI {
  public static get = requestWrapper(
    async (): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.get('/projects');
      return response.data;
    },
  );

  public static create = requestWrapper(
    async (
      data: ProjectCreate,
    ): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.post('/projects', data);
      return response.data;
    },
  );

  public static update = requestWrapper(
    async ({
      projectData,
      projectId,
    }: {
      projectId: string;
      projectData: ProjectCreate;
    }): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.put(`/projects/${projectId}`, projectData);
      return response.data;
    },
  );

  public static delete = requestWrapper(
    async (id: string): Promise<APIResponse | AxiosError<APIResponse>> => {
      const response = await API.delete(`/projects/${id}`);
      return response.data;
    },
  );
}
