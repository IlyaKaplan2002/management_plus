import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { Action } from 'store/types';
import incomeStatisticsActions from './incomeStatistics.actions';
import { IncomeStatisticsState } from './incomeStatistics.types';

const initialState: IncomeStatisticsState = {
  items: {},
  fetched: false,
  loading: false,
  error: null,
};

const reducer = createReducer(initialState, {
  [incomeStatisticsActions.get.pending.type]: (
    state: IncomeStatisticsState,
  ): IncomeStatisticsState => ({
    ...state,
    loading: true,
  }),
  [incomeStatisticsActions.get.fulfilled.type]: (
    state: IncomeStatisticsState,
    action: Action,
  ): IncomeStatisticsState => {
    const items = action.payload.reduce(
      (acc, item) => ({
        ...acc,
        [item.periodId]: {
          ...(acc[item.periodId] || {}),
          [item.productId]: {
            ...(acc?.[item.periodId]?.[item.productId] || {}),
            [item.id]: { ...item },
          },
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
  [incomeStatisticsActions.get.rejected.type]: (
    state: IncomeStatisticsState,
    action: Action,
  ): IncomeStatisticsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [incomeStatisticsActions.getByProjectId.pending.type]: (
    state: IncomeStatisticsState,
  ): IncomeStatisticsState => ({
    ...state,
    loading: true,
  }),
  [incomeStatisticsActions.getByProjectId.fulfilled.type]: (
    state: IncomeStatisticsState,
    action: Action,
  ): IncomeStatisticsState => {
    const items = action.payload.reduce(
      (acc, item) => ({
        ...acc,
        [item.periodId]: {
          ...(acc?.[item.periodId] || {}),
          [item.productId]: {
            ...(acc?.[item.periodId]?.[item.productId] || {}),
            [item.id]: { ...item },
          },
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
  [incomeStatisticsActions.getByProjectId.rejected.type]: (
    state: IncomeStatisticsState,
    action: Action,
  ): IncomeStatisticsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [incomeStatisticsActions.create.pending.type]: (
    state: IncomeStatisticsState,
  ): IncomeStatisticsState => ({
    ...state,
    loading: true,
  }),
  [incomeStatisticsActions.create.fulfilled.type]: (
    state: IncomeStatisticsState,
    action: Action,
  ): IncomeStatisticsState => ({
    ...state,
    items: {
      ...state.items,
      [action.payload.periodId]: {
        [action.payload.productId]: {
          [action.payload.id]: { ...action.payload },
          ...(state.items?.[action.payload.periodId]?.[
            action.payload.productId
          ] || {}),
        },
        ...(state.items?.[action.payload.periodId] || {}),
      },
    },
    loading: false,
  }),
  [incomeStatisticsActions.create.rejected.type]: (
    state: IncomeStatisticsState,
    action: Action,
  ): IncomeStatisticsState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [incomeStatisticsActions.createMany.pending.type]: (
    state: IncomeStatisticsState,
  ): IncomeStatisticsState => ({
    ...state,
    loading: true,
  }),
  [incomeStatisticsActions.createMany.fulfilled.type]: (
    state: IncomeStatisticsState,
    action: Action,
  ): IncomeStatisticsState => {
    const items = action.payload.reduce(
      (acc, item) => ({
        ...acc,
        [item.periodId]: {
          ...(acc?.[item.periodId] || {}),
          [item.productId]: {
            ...(acc?.[item.periodId]?.[item.productId] || {}),
            [item.id]: { ...item },
          },
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
  [incomeStatisticsActions.createMany.rejected.type]: (
    state: IncomeStatisticsState,
    action: Action,
  ): IncomeStatisticsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
