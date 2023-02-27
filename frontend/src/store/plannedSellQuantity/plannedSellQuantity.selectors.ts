import { RootState } from '../types';

const STATE_KEY = 'plannedSellQuantity';

export default class NormativePriceSelectors {
  public static getAll = (state: RootState) => state[STATE_KEY].items;
  public static getByPeriodId = (periodId: string) => (state: RootState) =>
    state[STATE_KEY].items[periodId] || {};
  public static getByPeriodIdAndProductId =
    ({ periodId, productId }: { periodId: string; productId: string }) =>
    (state: RootState) =>
      state[STATE_KEY].items?.[periodId]?.[productId] || {};
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
