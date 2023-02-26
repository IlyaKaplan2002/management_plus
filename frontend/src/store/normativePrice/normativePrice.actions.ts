import { createAsyncThunk } from '@reduxjs/toolkit';
import NormativePriceAPI from 'api/normativePrice';
import {
  CREATE,
  GET,
  GET_BY_PROJECT_ID,
  NormativePriceCreate,
  NormativePriceUpdate,
  UPDATE,
} from './normativePrice.types';

export default class NormativePriceActions {
  public static get = createAsyncThunk(
    GET,
    async (data: { projectId: string; periodId: string }, thunkAPI) => {
      const response = await NormativePriceAPI.get(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { normativePrices } = response.data;

      return thunkAPI.fulfillWithValue(normativePrices);
    },
  );

  public static getByProjectId = createAsyncThunk(
    GET_BY_PROJECT_ID,
    async (data: { projectId: string }, thunkAPI) => {
      const response = await NormativePriceAPI.getByProjectId(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { normativePrices } = response.data;

      return thunkAPI.fulfillWithValue(normativePrices);
    },
  );

  public static create = createAsyncThunk(
    CREATE,
    async (
      data: {
        projectId: string;
        periodId: string;
        normativePrice: NormativePriceCreate;
      },
      thunkAPI,
    ) => {
      const response = await NormativePriceAPI.create(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.normativePrice);
    },
  );

  public static update = createAsyncThunk(
    UPDATE,
    async (
      data: {
        projectId: string;
        normativePrice: NormativePriceUpdate;
        periodId: string;
        normativePriceId: string;
      },
      thunkAPI,
    ) => {
      const response = await NormativePriceAPI.update(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.normativePrice);
    },
  );
}
