import { RootState } from '../types';

const STATE_KEY = 'products';

export default class ProductsSelectors {
  public static getAll = (state: RootState) => state[STATE_KEY].items;
  public static getByProjectId = (projectId: string) => (state: RootState) =>
    state[STATE_KEY].items[projectId] || {};
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
