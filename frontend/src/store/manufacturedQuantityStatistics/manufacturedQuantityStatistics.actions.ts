import { createAsyncThunk } from '@reduxjs/toolkit';
import ManufacturedQuantityStatisticsAPI from 'api/manufacturedQuantityStatistics';
import {
  CREATE,
  GET,
  GET_BY_PROJECT_ID,
  CREATE_MANY,
  ManufacturedQuantityStatisticsCreate,
} from './manufacturedQuantityStatistics.types';

export default class ManufacturedQuantityStatisticsActions {
  public static get = createAsyncThunk(
    GET,
    async (data: { projectId: string; periodId: string }, thunkAPI) => {
      const response = await ManufacturedQuantityStatisticsAPI.get(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { manufacturedQuantityStatistics } = response.data;

      return thunkAPI.fulfillWithValue(manufacturedQuantityStatistics);
    },
  );

  public static getByProjectId = createAsyncThunk(
    GET_BY_PROJECT_ID,
    async (data: { projectId: string }, thunkAPI) => {
      const response = await ManufacturedQuantityStatisticsAPI.getByProjectId(
        data,
      );

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { manufacturedQuantityStatistics } = response.data;

      return thunkAPI.fulfillWithValue(manufacturedQuantityStatistics);
    },
  );

  public static create = createAsyncThunk(
    CREATE,
    async (
      data: {
        projectId: string;
        periodId: string;
        manufacturedQuantityStatistics: ManufacturedQuantityStatisticsCreate;
      },
      thunkAPI,
    ) => {
      const response = await ManufacturedQuantityStatisticsAPI.create(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(
        response.data.manufacturedQuantityStatistics,
      );
    },
  );

  public static createMany = createAsyncThunk(
    CREATE_MANY,
    async (
      data: {
        projectId: string;
        periodId: string;
        manufacturedQuantityStatistics: ManufacturedQuantityStatisticsCreate[];
      },
      thunkAPI,
    ) => {
      const response = await ManufacturedQuantityStatisticsAPI.createMany(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(
        response.data.manufacturedQuantityStatistics,
      );
    },
  );
}
