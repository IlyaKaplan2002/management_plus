import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { StatisticsState, StatisticsStore } from './statistics.types';
import StatisticsActions from './statistics.actions';
import { Action } from '../types';

const initialState: StatisticsState = {
  items: {},
  loading: false,
  error: null,
};

const reducer = createReducer(initialState, {
  [StatisticsActions.get.pending.type]: (state: StatisticsState) => ({
    ...state,
    loading: true,
  }),
  [StatisticsActions.get.fulfilled.type]: (
    state: StatisticsState,
    action: Action,
  ) => ({
    ...state,
    items: {
      ...state.items,
      [action.payload.projectId]: { ...action.payload.statistics },
    },
    loading: false,
  }),
  [StatisticsActions.get.rejected.type]: (
    state: StatisticsState,
    action: Action,
  ) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [StatisticsActions.create.pending.type]: (state: StatisticsState) => ({
    ...state,
    loading: true,
  }),
  [StatisticsActions.create.fulfilled.type]: (
    state: StatisticsState,
    action: Action,
  ) => {
    const { statistics, projectId } = action.payload as {
      statistics: StatisticsStore;
      projectId: string;
    };

    return {
      ...state,
      items: {
        ...state.items,
        [projectId]: {
          ...state.items[projectId],
          [statistics.id]: { ...statistics },
        },
      },
      loading: false,
    };
  },
  [StatisticsActions.create.rejected.type]: (
    state: StatisticsState,
    action: Action,
  ) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
