import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { Action } from 'store/types';
import costsStatisticsActions from './costsStatistics.actions';
import { CostsStatisticsState } from './costsStatistics.types';

const initialState: CostsStatisticsState = {
  items: {},
  fetched: false,
  loading: false,
  error: null,
};

const reducer = createReducer(initialState, {
  [costsStatisticsActions.get.pending.type]: (
    state: CostsStatisticsState,
  ): CostsStatisticsState => ({
    ...state,
    loading: true,
  }),
  [costsStatisticsActions.get.fulfilled.type]: (
    state: CostsStatisticsState,
    action: Action,
  ): CostsStatisticsState => {
    const items = action.payload.reduce(
      (acc, item) => ({
        ...acc,
        [item.periodId]: {
          ...(acc[item.periodId] || {}),
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
  [costsStatisticsActions.get.rejected.type]: (
    state: CostsStatisticsState,
    action: Action,
  ): CostsStatisticsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [costsStatisticsActions.getByProjectId.pending.type]: (
    state: CostsStatisticsState,
  ): CostsStatisticsState => ({
    ...state,
    loading: true,
  }),
  [costsStatisticsActions.getByProjectId.fulfilled.type]: (
    state: CostsStatisticsState,
    action: Action,
  ): CostsStatisticsState => {
    const items = action.payload.reduce(
      (acc, item) => ({
        ...acc,
        [item.periodId]: {
          ...(acc?.[item.periodId] || {}),
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
  [costsStatisticsActions.getByProjectId.rejected.type]: (
    state: CostsStatisticsState,
    action: Action,
  ): CostsStatisticsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [costsStatisticsActions.create.pending.type]: (
    state: CostsStatisticsState,
  ): CostsStatisticsState => ({
    ...state,
    loading: true,
  }),
  [costsStatisticsActions.create.fulfilled.type]: (
    state: CostsStatisticsState,
    action: Action,
  ): CostsStatisticsState => ({
    ...state,
    items: {
      ...state.items,
      [action.payload.periodId]: {
        [action.payload.id]: { ...action.payload },
        ...(state.items?.[action.payload.periodId] || {}),
      },
    },
    loading: false,
  }),
  [costsStatisticsActions.create.rejected.type]: (
    state: CostsStatisticsState,
    action: Action,
  ): CostsStatisticsState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
