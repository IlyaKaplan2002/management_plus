import { createAsyncThunk } from '@reduxjs/toolkit';
import CostsStatisticsAPI from 'api/costsStatistics';
import {
  CREATE,
  GET,
  GET_BY_PROJECT_ID,
  CostsStatisticsCreate,
} from './costsStatistics.types';

export default class CostsStatisticsActions {
  public static get = createAsyncThunk(
    GET,
    async (data: { projectId: string; periodId: string }, thunkAPI) => {
      const response = await CostsStatisticsAPI.get(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { costsStatistics } = response.data;

      return thunkAPI.fulfillWithValue(costsStatistics);
    },
  );

  public static getByProjectId = createAsyncThunk(
    GET_BY_PROJECT_ID,
    async (data: { projectId: string }, thunkAPI) => {
      const response = await CostsStatisticsAPI.getByProjectId(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { costsStatistics } = response.data;

      return thunkAPI.fulfillWithValue(costsStatistics);
    },
  );

  public static create = createAsyncThunk(
    CREATE,
    async (
      data: {
        projectId: string;
        periodId: string;
        costsStatistics: CostsStatisticsCreate;
      },
      thunkAPI,
    ) => {
      const response = await CostsStatisticsAPI.create(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.costsStatistics);
    },
  );
}
