import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GET_CURRENT_USER,
  LOGIN,
  LoginProps,
  LOGOUT,
  REFRESH_TOKEN,
  REGISTER,
  RegisterProps,
} from './auth.types';
import AuthAPI from 'api/auth';
import { setToken } from 'api/index';
import { RootState } from '../types';

export default class AuthActions {
  public static login = createAsyncThunk(
    LOGIN,
    async (data: LoginProps, thunkAPI) => {
      const response = await AuthAPI.login(data);
      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data);
    },
  );

  public static register = createAsyncThunk(
    REGISTER,
    async (data: RegisterProps, thunkAPI) => {
      const response = await AuthAPI.register(data);
      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data);
    },
  );

  public static refreshToken = createAsyncThunk(
    REFRESH_TOKEN,
    async (_, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const { refreshToken } = state.auth;
      if (!refreshToken) {
        return thunkAPI.rejectWithValue(`Refresh token doesn't exist`);
      }

      setToken(refreshToken);
      const response = await AuthAPI.refreshToken();

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data);
    },
  );

  public static getCurrentUser = createAsyncThunk(
    GET_CURRENT_USER,
    async (_, thunkAPI) => {
      const response = await AuthAPI.getCurrentUser();

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data);
    },
  );

  public static logout = createAsyncThunk(LOGOUT, async (_, thunkAPI) => {
    await AuthAPI.logout();
    thunkAPI.fulfillWithValue(null);
  });
}
