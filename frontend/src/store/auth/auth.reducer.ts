import { createReducer } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { login } from './auth.actions';
import { Action } from 'store/types';

const persistConfig: PersistConfig<AuthState> = {
  key: 'root',
  storage,
  whitelist: ['token', 'refreshToken'],
};

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  error: null,
  loading: false,
};

const reducer = createReducer(initialState, {
  [login.pending.type]: (state: AuthState) => ({ ...state, loading: true }),
  [login.rejected.type]: (state: AuthState, action: Action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [login.fulfilled.type]: (state: AuthState, action: Action) => ({
    ...state,
    user: action.payload.user,
    token: action.payload.token,
    refreshToken: action.payload.refreshToken,
    loading: false,
    error: null,
  }),
});

export default persistReducer(persistConfig, reducer);
