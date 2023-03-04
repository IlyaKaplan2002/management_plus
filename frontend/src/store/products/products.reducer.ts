import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { Action } from 'store/types';
import productsActions from './products.actions';
import { ProductsState } from './products.types';

const initialState: ProductsState = {
  items: {},
  fetched: false,
  loading: false,
  error: null,
};

const reducer = createReducer(initialState, {
  [productsActions.get.pending.type]: (
    state: ProductsState,
  ): ProductsState => ({
    ...state,
    loading: true,
  }),
  [productsActions.get.fulfilled.type]: (
    state: ProductsState,
    action: Action,
  ): ProductsState => {
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
  [productsActions.get.rejected.type]: (
    state: ProductsState,
    action: Action,
  ): ProductsState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [productsActions.create.pending.type]: (
    state: ProductsState,
  ): ProductsState => ({
    ...state,
    loading: true,
  }),
  [productsActions.create.fulfilled.type]: (
    state: ProductsState,
    action: Action,
  ): ProductsState => ({
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
  [productsActions.create.rejected.type]: (
    state: ProductsState,
    action: Action,
  ): ProductsState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [productsActions.createMany.pending.type]: (
    state: ProductsState,
  ): ProductsState => ({
    ...state,
    loading: true,
  }),
  [productsActions.createMany.fulfilled.type]: (
    state: ProductsState,
    action: Action,
  ): ProductsState => {
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
  [productsActions.createMany.rejected.type]: (
    state: ProductsState,
    action: Action,
  ): ProductsState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [productsActions.update.pending.type]: (
    state: ProductsState,
  ): ProductsState => ({
    ...state,
    loading: true,
  }),
  [productsActions.update.fulfilled.type]: (
    state: ProductsState,
    action: Action,
  ): ProductsState => {
    state.items[action.payload.projectId][action.payload.id] = action.payload;

    return state;
  },
  [productsActions.update.rejected.type]: (
    state: ProductsState,
    action: Action,
  ): ProductsState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [productsActions.delete.pending.type]: (
    state: ProductsState,
  ): ProductsState => ({
    ...state,
    loading: true,
  }),
  [productsActions.delete.fulfilled.type]: (
    state: ProductsState,
    action: Action,
  ): ProductsState => {
    const newProjectItems = { ...state.items[action.payload.projectId] };
    delete newProjectItems[action.payload.productId];

    return {
      ...state,
      items: {
        ...state.items,
        [action.payload.projectId]: { ...newProjectItems },
      },
      loading: false,
    };
  },
  [productsActions.delete.rejected.type]: (
    state: ProductsState,
    action: Action,
  ): ProductsState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
