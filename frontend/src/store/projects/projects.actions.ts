import { createAsyncThunk } from '@reduxjs/toolkit';
import ProjectsAPI from 'api/projects';
import { CREATE, GET, ProjectCreate, Project } from './projects.type';

export default class ProjectsActions {
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

      return thunkAPI.fulfillWithValue(response.data);
    },
  );
}
