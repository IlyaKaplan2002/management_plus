import { createAsyncThunk } from '@reduxjs/toolkit';
import IncomeStatisticsAPI from 'api/incomeStatistics';
import {
  CREATE,
  GET,
  GET_BY_PROJECT_ID,
  CREATE_MANY,
  IncomeStatisticsCreate,
} from './incomeStatistics.types';

export default class IncomeStatisticsActions {
  public static get = createAsyncThunk(
    GET,
    async (data: { projectId: string; periodId: string }, thunkAPI) => {
      const response = await IncomeStatisticsAPI.get(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { incomeStatistics } = response.data;

      return thunkAPI.fulfillWithValue(incomeStatistics);
    },
  );

  public static getByProjectId = createAsyncThunk(
    GET_BY_PROJECT_ID,
    async (data: { projectId: string }, thunkAPI) => {
      const response = await IncomeStatisticsAPI.getByProjectId(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { incomeStatistics } = response.data;

      return thunkAPI.fulfillWithValue(incomeStatistics);
    },
  );

  public static create = createAsyncThunk(
    CREATE,
    async (
      data: {
        projectId: string;
        periodId: string;
        incomeStatistics: IncomeStatisticsCreate;
      },
      thunkAPI,
    ) => {
      const response = await IncomeStatisticsAPI.create(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.incomeStatistics);
    },
  );

  public static createMany = createAsyncThunk(
    CREATE_MANY,
    async (
      data: {
        projectId: string;
        periodId: string;
        incomeStatistics: IncomeStatisticsCreate[];
      },
      thunkAPI,
    ) => {
      const response = await IncomeStatisticsAPI.createMany(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.incomeStatistics);
    },
  );
}
