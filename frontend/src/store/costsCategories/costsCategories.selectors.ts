import { RootState } from '../types';

const STATE_KEY = 'costsCategories';

export default class CostsCategoriesSelectors {
  public static getAll = (state: RootState) => state[STATE_KEY].items;
  public static getByProjectId = (projectId: string) => (state: RootState) =>
    state[STATE_KEY].items[projectId] || {};
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
