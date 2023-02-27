import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { Action } from 'store/types';
import periodsActions from './periods.actions';
import { PeriodsState } from './periods.types';

const initialState: PeriodsState = {
  items: {},
  fetched: false,
  loading: false,
  error: null,
};

const reducer = createReducer(initialState, {
  [periodsActions.get.pending.type]: (state: PeriodsState): PeriodsState => ({
    ...state,
    loading: true,
  }),
  [periodsActions.get.fulfilled.type]: (
    state: PeriodsState,
    action: Action,
  ): PeriodsState => {
    const items = action.payload.reduce(
      (acc, item) => ({
        ...acc,
        [item.projectId]: {
          ...(acc[item.projectId] || {}),
          [item.id]: { ...item },
        },
      }),
      state.items,
    );

    return {
      ...state,
      items,
      fetched: true,
      loading: false,
    };
  },
  [periodsActions.get.rejected.type]: (
    state: PeriodsState,
    action: Action,
  ): PeriodsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [periodsActions.create.pending.type]: (
    state: PeriodsState,
  ): PeriodsState => ({
    ...state,
    loading: true,
  }),
  [periodsActions.create.fulfilled.type]: (
    state: PeriodsState,
    action: Action,
  ): PeriodsState => ({
    ...state,
    items: {
      ...state.items,
      [action.payload.projectId]: {
        [action.payload.id]: { ...action.payload },
        ...(state.items[action.payload.projectId] || {}),
      },
    },
    loading: false,
  }),
  [periodsActions.create.rejected.type]: (
    state: PeriodsState,
    action: Action,
  ): PeriodsState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [periodsActions.update.pending.type]: (
    state: PeriodsState,
  ): PeriodsState => ({
    ...state,
    loading: true,
  }),
  [periodsActions.update.fulfilled.type]: (
    state: PeriodsState,
    action: Action,
  ): PeriodsState => {
    state.items[action.payload.projectId][action.payload.id] = action.payload;

    return state;
  },
  [periodsActions.update.rejected.type]: (
    state: PeriodsState,
    action: Action,
  ): PeriodsState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
