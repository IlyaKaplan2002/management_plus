import { RootState } from '../types';

const STATE_KEY = 'projects';

export default class ProjectsSelectors {
  public static getAll = (state: RootState) => state[STATE_KEY].items;
  public static getById = (projectId: string) => (state: RootState) =>
    state[STATE_KEY].items[projectId] || null;
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
  public static getCurrentlyCreating = (state: RootState) =>
    state[STATE_KEY].currentlyCreating;
}
