import { createAsyncThunk } from '@reduxjs/toolkit';
import CostsCategoriesAPI from 'api/costsCategories';
import {
  CREATE,
  CREATE_MANY,
  GET,
  CostsCategoryCreate,
  DELETE,
} from './costsCategories.types';

export default class ProjectsActions {
  public static get = createAsyncThunk(
    GET,
    async (projectId: string, thunkAPI) => {
      const response = await CostsCategoriesAPI.get(projectId);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { costsCategories } = response.data;

      return thunkAPI.fulfillWithValue(costsCategories);
    },
  );

  public static create = createAsyncThunk(
    CREATE,
    async (
      data: { projectId: string; costsCategory: CostsCategoryCreate },
      thunkAPI,
    ) => {
      const response = await CostsCategoriesAPI.create(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.costsCategory);
    },
  );

  public static createMany = createAsyncThunk(
    CREATE_MANY,
    async (
      data: { projectId: string; costsCategories: CostsCategoryCreate[] },
      thunkAPI,
    ) => {
      const response = await CostsCategoriesAPI.createMany(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.costsCategories);
    },
  );

  public static delete = createAsyncThunk(
    DELETE,
    async (data: { projectId: string; costsCategoryId: string }, thunkAPI) => {
      const response = await CostsCategoriesAPI.delete(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(data);
    },
  );
}
