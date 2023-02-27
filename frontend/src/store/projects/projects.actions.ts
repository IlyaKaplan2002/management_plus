import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectsAPI from 'api/projects';
import {
  CREATE,
  GET,
  ProjectCreate,
  Project,
  RESET_CURRENTLY_CREATING,
  DELETE,
} from './projects.types';

export default class ProjectsActions {
  public static resetCurrentlyCreating = createAction(RESET_CURRENTLY_CREATING);

  public static get = createAsyncThunk(GET, async (_, thunkAPI) => {
    const response = await ProjectsAPI.get();

    if (response.status === 'failed') {
      return thunkAPI.rejectWithValue(response.message);
    }

    const projects = response.data.projects.reduce(
      (acc: { [key: string]: Project }, item: Project) => ({
        ...acc,
        [item.id]: { ...item },
      }),
      {},
    );

    return thunkAPI.fulfillWithValue(projects);
  });

  public static create = createAsyncThunk(
    CREATE,
    async (data: ProjectCreate, thunkAPI) => {
      const response = await ProjectsAPI.create(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.project);
    },
  );

  public static update = createAsyncThunk(
    CREATE,
    async (
      data: { projectId: string; projectData: ProjectCreate },
      thunkAPI,
    ) => {
      const response = await ProjectsAPI.update(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.project);
    },
  );

  public static delete = createAsyncThunk(
    DELETE,
    async (projectId: string, thunkAPI) => {
      const response = await ProjectsAPI.delete(projectId);

      if (response?.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(projectId);
    },
  );
}
