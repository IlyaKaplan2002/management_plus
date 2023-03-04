import { createAsyncThunk } from '@reduxjs/toolkit';
import PeriodsAPI from 'api/periods';
import {
  CREATE,
  GET,
  PeriodCreate,
  UPDATE,
  PeriodUpdate,
} from './periods.types';

export default class PeriodsActions {
  public static get = createAsyncThunk(
    GET,
    async (projectId: string, thunkAPI) => {
      const response = await PeriodsAPI.get(projectId);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { periods } = response.data;

      return thunkAPI.fulfillWithValue(periods);
    },
  );

  public static create = createAsyncThunk(
    CREATE,
    async (data: { projectId: string; period: PeriodCreate }, thunkAPI) => {
      const response = await PeriodsAPI.create(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.period);
    },
  );

  public static update = createAsyncThunk(
    UPDATE,
    async (
      data: { projectId: string; period: PeriodUpdate; periodId: string },
      thunkAPI,
    ) => {
      const response = await PeriodsAPI.update(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.period);
    },
  );
}
