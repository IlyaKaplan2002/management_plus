import { createAsyncThunk } from '@reduxjs/toolkit';
import PlannedSellQuantityAPI from 'api/plannedSellQuantity';
import {
  CREATE,
  GET,
  UPDATE,
  PlannedSellQuantityCreate,
  PlannedSellQuantityUpdate,
  GET_BY_PROJECT_ID,
} from './plannedSellQuantity.types';

export default class PlannedSellQuantityActions {
  public static get = createAsyncThunk(
    GET,
    async (data: { projectId: string; periodId: string }, thunkAPI) => {
      const response = await PlannedSellQuantityAPI.get(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { plannedSellQuantities } = response.data;

      return thunkAPI.fulfillWithValue(plannedSellQuantities);
    },
  );

  public static getByProjectId = createAsyncThunk(
    GET_BY_PROJECT_ID,
    async (data: { projectId: string }, thunkAPI) => {
      const response = await PlannedSellQuantityAPI.getByProjectId(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { plannedSellQuantities } = response.data;

      return thunkAPI.fulfillWithValue(plannedSellQuantities);
    },
  );

  public static create = createAsyncThunk(
    CREATE,
    async (
      data: {
        projectId: string;
        periodId: string;
        plannedSellQuantity: PlannedSellQuantityCreate;
      },
      thunkAPI,
    ) => {
      const response = await PlannedSellQuantityAPI.create(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.plannedSellQuantity);
    },
  );

  public static update = createAsyncThunk(
    UPDATE,
    async (
      data: {
        projectId: string;
        plannedSellQuantity: PlannedSellQuantityUpdate;
        periodId: string;
        plannedSellQuantityId: string;
      },
      thunkAPI,
    ) => {
      const response = await PlannedSellQuantityAPI.update(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.plannedSellQuantity);
    },
  );
}
