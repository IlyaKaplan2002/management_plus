import { createReducer } from '@reduxjs/toolkit';
import { Action } from 'store/types';
import projectsActions from './projects.actions';
import { ProjectsState } from './projects.type';

const initialState: ProjectsState = {
  items: {},
  loading: false,
  error: null,
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
    loading: false,
  }),
  [projectsActions.get.rejected.type]: (
    state: ProjectsState,
    action: Action,
  ) => ({
    ...state,
    error: action.payload,
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
    items: { ...state.items, [action.payload.id]: action.payload },
    loading: false,
  }),
  [projectsActions.create.rejected.type]: (
    state: ProjectsState,
    action: Action,
  ) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
});

export default reducer;
