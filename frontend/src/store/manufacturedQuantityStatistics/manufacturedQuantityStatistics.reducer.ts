import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { Action } from 'store/types';
import manufacturedQuantityStatisticsActions from './manufacturedQuantityStatistics.actions';
import { ManufacturedQuantityStatisticsState } from './manufacturedQuantityStatistics.types';

const initialState: ManufacturedQuantityStatisticsState = {
  items: {},
  fetched: false,
  loading: false,
  error: null,
};

const reducer = createReducer(initialState, {
  [manufacturedQuantityStatisticsActions.get.pending.type]: (
    state: ManufacturedQuantityStatisticsState,
  ): ManufacturedQuantityStatisticsState => ({
    ...state,
    loading: true,
  }),
  [manufacturedQuantityStatisticsActions.get.fulfilled.type]: (
    state: ManufacturedQuantityStatisticsState,
    action: Action,
  ): ManufacturedQuantityStatisticsState => {
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
  [manufacturedQuantityStatisticsActions.get.rejected.type]: (
    state: ManufacturedQuantityStatisticsState,
    action: Action,
  ): ManufacturedQuantityStatisticsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [manufacturedQuantityStatisticsActions.getByProjectId.pending.type]: (
    state: ManufacturedQuantityStatisticsState,
  ): ManufacturedQuantityStatisticsState => ({
    ...state,
    loading: true,
  }),
  [manufacturedQuantityStatisticsActions.getByProjectId.fulfilled.type]: (
    state: ManufacturedQuantityStatisticsState,
    action: Action,
  ): ManufacturedQuantityStatisticsState => {
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
  [manufacturedQuantityStatisticsActions.getByProjectId.rejected.type]: (
    state: ManufacturedQuantityStatisticsState,
    action: Action,
  ): ManufacturedQuantityStatisticsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [manufacturedQuantityStatisticsActions.create.pending.type]: (
    state: ManufacturedQuantityStatisticsState,
  ): ManufacturedQuantityStatisticsState => ({
    ...state,
    loading: true,
  }),
  [manufacturedQuantityStatisticsActions.create.fulfilled.type]: (
    state: ManufacturedQuantityStatisticsState,
    action: Action,
  ): ManufacturedQuantityStatisticsState => ({
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
  [manufacturedQuantityStatisticsActions.create.rejected.type]: (
    state: ManufacturedQuantityStatisticsState,
    action: Action,
  ): ManufacturedQuantityStatisticsState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [manufacturedQuantityStatisticsActions.createMany.pending.type]: (
    state: ManufacturedQuantityStatisticsState,
  ): ManufacturedQuantityStatisticsState => ({
    ...state,
    loading: true,
  }),
  [manufacturedQuantityStatisticsActions.createMany.fulfilled.type]: (
    state: ManufacturedQuantityStatisticsState,
    action: Action,
  ): ManufacturedQuantityStatisticsState => {
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
  [manufacturedQuantityStatisticsActions.createMany.rejected.type]: (
    state: ManufacturedQuantityStatisticsState,
    action: Action,
  ): ManufacturedQuantityStatisticsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
