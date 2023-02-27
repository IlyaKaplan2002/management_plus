import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { Action } from 'store/types';
import costsCategoriesActions from './costsCategories.actions';
import { CostsCategoriesState } from './costsCategories.types';

const initialState: CostsCategoriesState = {
  items: {},
  fetched: false,
  loading: false,
  error: null,
};

const reducer = createReducer(initialState, {
  [costsCategoriesActions.get.pending.type]: (
    state: CostsCategoriesState,
  ): CostsCategoriesState => ({
    ...state,
    loading: true,
  }),
  [costsCategoriesActions.get.fulfilled.type]: (
    state: CostsCategoriesState,
    action: Action,
  ): CostsCategoriesState => {
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
  [costsCategoriesActions.get.rejected.type]: (
    state: CostsCategoriesState,
    action: Action,
  ): CostsCategoriesState => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [costsCategoriesActions.create.pending.type]: (
    state: CostsCategoriesState,
  ): CostsCategoriesState => ({
    ...state,
    loading: true,
  }),
  [costsCategoriesActions.create.fulfilled.type]: (
    state: CostsCategoriesState,
    action: Action,
  ): CostsCategoriesState => ({
    ...state,
    items: {
      ...state.items,
      [action.payload.projectId]: {
        ...(state.items[action.payload.projectId] || {}),
        [action.payload.id]: { ...action.payload },
      },
    },
    loading: false,
  }),
  [costsCategoriesActions.create.rejected.type]: (
    state: CostsCategoriesState,
    action: Action,
  ): CostsCategoriesState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [costsCategoriesActions.createMany.pending.type]: (
    state: CostsCategoriesState,
  ): CostsCategoriesState => ({
    ...state,
    loading: true,
  }),
  [costsCategoriesActions.createMany.fulfilled.type]: (
    state: CostsCategoriesState,
    action: Action,
  ): CostsCategoriesState => {
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
  [costsCategoriesActions.createMany.rejected.type]: (
    state: CostsCategoriesState,
    action: Action,
  ): CostsCategoriesState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [costsCategoriesActions.delete.pending.type]: (
    state: CostsCategoriesState,
  ): CostsCategoriesState => ({
    ...state,
    loading: true,
  }),
  [costsCategoriesActions.delete.fulfilled.type]: (
    state: CostsCategoriesState,
    action: Action,
  ): CostsCategoriesState => {
    const newProjectItems = { ...state.items[action.payload.projectId] };
    delete newProjectItems[action.payload.costsCategoryId];

    return {
      ...state,
      items: {
        ...state.items,
        [action.payload.projectId]: { ...newProjectItems },
      },
    };
  },
  [costsCategoriesActions.delete.rejected.type]: (
    state: CostsCategoriesState,
    action: Action,
  ): CostsCategoriesState => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
