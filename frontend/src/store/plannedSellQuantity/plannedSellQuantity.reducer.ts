import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { Action } from 'store/types';
import plannedSellQuantityActions from './plannedSellQuantity.actions';
import { PlannedSellQuantityState } from './plannedSellQuantity.types';

const initialState: PlannedSellQuantityState = {
  items: {},
  fetched: false,
  loading: false,
  error: null,
};

const reducer = createReducer(initialState, {
  [plannedSellQuantityActions.get.pending.type]: (
    state: PlannedSellQuantityState,
  ): PlannedSellQuantityState => ({
    ...state,
    loading: true,
  }),
  [plannedSellQuantityActions.get.fulfilled.type]: (
    state: PlannedSellQuantityState,
    action: Action,
  ): PlannedSellQuantityState => {
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
  [plannedSellQuantityActions.get.rejected.type]: (
    state: PlannedSellQuantityState,
    action: Action,
  ): PlannedSellQuantityState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [plannedSellQuantityActions.getByProjectId.pending.type]: (
    state: PlannedSellQuantityState,
  ): PlannedSellQuantityState => ({
    ...state,
    loading: true,
  }),
  [plannedSellQuantityActions.getByProjectId.fulfilled.type]: (
    state: PlannedSellQuantityState,
    action: Action,
  ): PlannedSellQuantityState => {
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
  [plannedSellQuantityActions.getByProjectId.rejected.type]: (
    state: PlannedSellQuantityState,
    action: Action,
  ): PlannedSellQuantityState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [plannedSellQuantityActions.create.pending.type]: (
    state: PlannedSellQuantityState,
  ): PlannedSellQuantityState => ({
    ...state,
    loading: true,
  }),
  [plannedSellQuantityActions.create.fulfilled.type]: (
    state: PlannedSellQuantityState,
    action: Action,
  ): PlannedSellQuantityState => ({
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
  [plannedSellQuantityActions.create.rejected.type]: (
    state: PlannedSellQuantityState,
    action: Action,
  ): PlannedSellQuantityState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [plannedSellQuantityActions.update.pending.type]: (
    state: PlannedSellQuantityState,
  ): PlannedSellQuantityState => ({
    ...state,
    loading: true,
  }),
  [plannedSellQuantityActions.update.fulfilled.type]: (
    state: PlannedSellQuantityState,
    action: Action,
  ): PlannedSellQuantityState => ({
    ...state,
    items: {
      ...state.items,
      [action.payload.periodId]: {
        ...(state.items?.[action.payload.periodId] || {}),
        [action.payload.productId]: {
          ...(state.items?.[action.payload.periodId]?.[
            action.payload.productId
          ] || {}),
          [action.payload.id]: { ...action.payload },
        },
      },
    },
  }),
  [plannedSellQuantityActions.update.rejected.type]: (
    state: PlannedSellQuantityState,
    action: Action,
  ): PlannedSellQuantityState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
