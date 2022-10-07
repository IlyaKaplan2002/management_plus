import { createReducer } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authActions from './auth.actions';
import { Action } from 'store/types';
import { setToken, removeToken } from 'api/index';

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
  [authActions.login.pending.type]: (state: AuthState) => ({
    ...state,
    loading: true,
  }),
  [authActions.login.rejected.type]: (_, action: Action) => ({
    ...initialState,
    error: action.payload,
  }),
  [authActions.login.fulfilled.type]: (state: AuthState, action: Action) => {
    setToken(action.payload.token);
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      refreshToken: action.payload.refreshToken,
      loading: false,
      error: null,
    };
  },

  [authActions.register.pending.type]: (state: AuthState) => ({
    ...state,
    loading: true,
  }),
  [authActions.register.rejected.type]: (_, action: Action) => ({
    ...initialState,
    error: action.payload,
  }),
  [authActions.register.fulfilled.type]: (state: AuthState, action: Action) => {
    setToken(action.payload.token);
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      refreshToken: action.payload.refreshToken,
      loading: false,
      error: null,
    };
  },

  [authActions.getCurrentUser.pending.type]: (state: AuthState) => ({
    ...state,
    loading: true,
  }),
  [authActions.getCurrentUser.rejected.type]: () => {
    removeToken();
    return initialState;
  },
  [authActions.getCurrentUser.fulfilled.type]: (
    state: AuthState,
    action: Action,
  ) => {
    setToken(action.payload.token);
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      refreshToken: action.payload.refreshToken,
      loading: false,
      error: null,
    };
  },

  [authActions.refreshToken.pending.type]: (state: AuthState) => ({
    ...state,
    loading: true,
  }),
  [authActions.refreshToken.rejected.type]: () => {
    removeToken();
    return initialState;
  },
  [authActions.refreshToken.fulfilled.type]: (
    state: AuthState,
    action: Action,
  ) => {
    setToken(action.payload.token);
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      refreshToken: action.payload.refreshToken,
      loading: false,
      error: null,
    };
  },

  [authActions.logout.pending.type]: (state: AuthState) => ({
    ...state,
    loading: true,
  }),
  [authActions.logout.rejected.type]: () => {
    removeToken();
    return initialState;
  },
  [authActions.logout.fulfilled.type]: () => {
    removeToken();
    return initialState;
  },

  'persist/REHYDRATE': (state: AuthState, action: Action) => {
    const { payload } = action;
    if (!payload) return { ...state };
    const { token } = payload;
    if (token) {
      setToken(token);
    }
    return { ...state };
  },
});

export default persistReducer(persistConfig, reducer);
