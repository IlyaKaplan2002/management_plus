import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginProps } from './auth.types';
import AuthAPI from '../../api/auth';

export const namespace = 'AUTH';

export const setError = createAction(`${namespace}/SET_ERROR`);

export const login = createAsyncThunk(
  `${namespace}/LOGIN`,
  async (data: LoginProps, thunkAPI) => {
    const response = await AuthAPI.login(data);
    if (response.status === 'failed') {
      return thunkAPI.rejectWithValue(response.message);
    }
    return thunkAPI.fulfillWithValue(response.data);
  },
);
