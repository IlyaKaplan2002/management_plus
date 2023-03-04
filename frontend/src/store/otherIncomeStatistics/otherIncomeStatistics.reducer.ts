import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { Action } from 'store/types';
import otherIncomeStatisticsActions from './otherIncomeStatistics.actions';
import { OtherIncomeStatisticsState } from './otherIncomeStatistics.types';

const initialState: OtherIncomeStatisticsState = {
  items: {},
  fetched: false,
  loading: false,
  error: null,
};

const reducer = createReducer(initialState, {
  [otherIncomeStatisticsActions.get.pending.type]: (
    state: OtherIncomeStatisticsState,
  ): OtherIncomeStatisticsState => ({
    ...state,
    loading: true,
  }),
  [otherIncomeStatisticsActions.get.fulfilled.type]: (
    state: OtherIncomeStatisticsState,
    action: Action,
  ): OtherIncomeStatisticsState => {
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
  [otherIncomeStatisticsActions.get.rejected.type]: (
    state: OtherIncomeStatisticsState,
    action: Action,
  ): OtherIncomeStatisticsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [otherIncomeStatisticsActions.getByProjectId.pending.type]: (
    state: OtherIncomeStatisticsState,
  ): OtherIncomeStatisticsState => ({
    ...state,
    loading: true,
  }),
  [otherIncomeStatisticsActions.getByProjectId.fulfilled.type]: (
    state: OtherIncomeStatisticsState,
    action: Action,
  ): OtherIncomeStatisticsState => {
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
  [otherIncomeStatisticsActions.getByProjectId.rejected.type]: (
    state: OtherIncomeStatisticsState,
    action: Action,
  ): OtherIncomeStatisticsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [otherIncomeStatisticsActions.create.pending.type]: (
    state: OtherIncomeStatisticsState,
  ): OtherIncomeStatisticsState => ({
    ...state,
    loading: true,
  }),
  [otherIncomeStatisticsActions.create.fulfilled.type]: (
    state: OtherIncomeStatisticsState,
    action: Action,
  ): OtherIncomeStatisticsState => ({
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
  [otherIncomeStatisticsActions.create.rejected.type]: (
    state: OtherIncomeStatisticsState,
    action: Action,
  ): OtherIncomeStatisticsState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
