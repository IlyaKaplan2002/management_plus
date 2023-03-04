import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { Action } from 'store/types';
import normativePriceActions from './normativePrice.actions';
import { NormativePriceState } from './normativePrice.types';

const initialState: NormativePriceState = {
  items: {},
  fetched: false,
  loading: false,
  error: null,
};

const reducer = createReducer(initialState, {
  [normativePriceActions.get.pending.type]: (
    state: NormativePriceState,
  ): NormativePriceState => ({
    ...state,
    loading: true,
  }),
  [normativePriceActions.get.fulfilled.type]: (
    state: NormativePriceState,
    action: Action,
  ): NormativePriceState => {
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
  [normativePriceActions.get.rejected.type]: (
    state: NormativePriceState,
    action: Action,
  ): NormativePriceState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [normativePriceActions.getByProjectId.pending.type]: (
    state: NormativePriceState,
  ): NormativePriceState => ({
    ...state,
    loading: true,
  }),
  [normativePriceActions.getByProjectId.fulfilled.type]: (
    state: NormativePriceState,
    action: Action,
  ): NormativePriceState => {
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
  [normativePriceActions.getByProjectId.rejected.type]: (
    state: NormativePriceState,
    action: Action,
  ): NormativePriceState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [normativePriceActions.create.pending.type]: (
    state: NormativePriceState,
  ): NormativePriceState => ({
    ...state,
    loading: true,
  }),
  [normativePriceActions.create.fulfilled.type]: (
    state: NormativePriceState,
    action: Action,
  ): NormativePriceState => ({
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
  [normativePriceActions.create.rejected.type]: (
    state: NormativePriceState,
    action: Action,
  ): NormativePriceState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [normativePriceActions.update.pending.type]: (
    state: NormativePriceState,
  ): NormativePriceState => ({
    ...state,
    loading: true,
  }),
  [normativePriceActions.update.fulfilled.type]: (
    state: NormativePriceState,
    action: Action,
  ): NormativePriceState => ({
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
  [normativePriceActions.update.rejected.type]: (
    state: NormativePriceState,
    action: Action,
  ): NormativePriceState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
