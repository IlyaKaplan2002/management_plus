import { createAsyncThunk } from '@reduxjs/toolkit';
import OtherIncomeStatisticsAPI from 'api/otherIncomeStatistics';
import {
  CREATE,
  GET,
  GET_BY_PROJECT_ID,
  OtherIncomeStatisticsCreate,
} from './otherIncomeStatistics.types';

export default class IncomeStatisticsActions {
  public static get = createAsyncThunk(
    GET,
    async (data: { projectId: string; periodId: string }, thunkAPI) => {
      const response = await OtherIncomeStatisticsAPI.get(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { otherIncomeStatistics } = response.data;

      return thunkAPI.fulfillWithValue(otherIncomeStatistics);
    },
  );

  public static getByProjectId = createAsyncThunk(
    GET_BY_PROJECT_ID,
    async (data: { projectId: string }, thunkAPI) => {
      const response = await OtherIncomeStatisticsAPI.getByProjectId(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { otherIncomeStatistics } = response.data;

      return thunkAPI.fulfillWithValue(otherIncomeStatistics);
    },
  );

  public static create = createAsyncThunk(
    CREATE,
    async (
      data: {
        projectId: string;
        periodId: string;
        otherIncomeStatistics: OtherIncomeStatisticsCreate;
      },
      thunkAPI,
    ) => {
      const response = await OtherIncomeStatisticsAPI.create(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.otherIncomeStatistics);
    },
  );
}
