import { RootState } from '../types';

export default class ProjectsSelectors {
  public static getAll = (state: RootState) => state.projects.items;
  public static getLoading = (state: RootState) => state.projects.loading;
  public static getError = (state: RootState) => state.projects.error;
}
