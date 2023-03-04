import { createReducer } from '@reduxjs/toolkit';
import { authActions } from 'store/auth';
import { Action } from 'store/types';
import projectsActions from './projects.actions';
import { ProjectsState } from './projects.types';

const initialState: ProjectsState = {
  items: {},
  fetched: false,
  loading: false,
  error: null,
  currentlyCreating: null,
};

const reducer = createReducer(initialState, {
  [projectsActions.get.pending.type]: (state: ProjectsState) => ({
    ...state,
    loading: true,
  }),
  [projectsActions.get.fulfilled.type]: (
    state: ProjectsState,
    action: Action,
  ) => ({
    ...state,
    items: { ...action.payload },
    fetched: true,
    loading: false,
  }),
  [projectsActions.get.rejected.type]: (
    state: ProjectsState,
    action: Action,
  ) => ({
    ...state,
    error: action.payload,
    fetched: true,
    loading: false,
  }),

  [projectsActions.create.pending.type]: (state: ProjectsState) => ({
    ...state,
    loading: true,
  }),
  [projectsActions.create.fulfilled.type]: (
    state: ProjectsState,
    action: Action,
  ) => ({
    ...state,
    items: { [action.payload.id]: action.payload, ...state.items },
    loading: false,
    currentlyCreating: action.payload.id,
  }),
  [projectsActions.create.rejected.type]: (
    state: ProjectsState,
    action: Action,
  ) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [projectsActions.update.pending.type]: (state: ProjectsState) => ({
    ...state,
    loading: true,
  }),
  [projectsActions.update.fulfilled.type]: (
    state: ProjectsState,
    action: Action,
  ) => {
    const newItems = { ...state.items };
    delete newItems[action.payload.id];

    return {
      ...state,
      items: { [action.payload.id]: action.payload, ...newItems },
      loading: false,
      currentlyCreating: action.payload.id,
    };
  },
  [projectsActions.update.rejected.type]: (
    state: ProjectsState,
    action: Action,
  ) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [projectsActions.delete.pending.type]: (state: ProjectsState) => ({
    ...state,
    loading: true,
  }),
  [projectsActions.delete.fulfilled.type]: (
    state: ProjectsState,
    action: Action,
  ) => {
    const newItems = { ...state.items };

    delete newItems[action.payload];

    return {
      ...state,
      items: { ...newItems },
      loading: false,
      currentlyCreating: action.payload.id,
    };
  },
  [projectsActions.delete.rejected.type]: (
    state: ProjectsState,
    action: Action,
  ) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),

  [projectsActions.resetCurrentlyCreating.type]: (
    state: ProjectsState,
  ): ProjectsState => ({ ...state, currentlyCreating: null }),

  [authActions.logout.rejected.type]: () => initialState,
  [authActions.logout.fulfilled.type]: () => initialState,
});

export default reducer;
