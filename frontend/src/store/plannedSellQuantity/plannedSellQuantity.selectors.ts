import { periodsSelectors } from 'store/periods';
import { RootState } from '../types';
import { PlannedSellQuantity } from './plannedSellQuantity.types';

const STATE_KEY = 'plannedSellQuantity';

export default class NormativePriceSelectors {
  public static getAll = (state: RootState) => state[STATE_KEY].items;
  public static getByPeriodId = (periodId: string) => (state: RootState) =>
    state[STATE_KEY].items[periodId] || {};
  public static getByPeriodIdAndProductId =
    ({ periodId, productId }: { periodId: string; productId: string }) =>
    (state: RootState) =>
      state[STATE_KEY].items?.[periodId]?.[productId] || {};
  public static getByProjectId = (projectId: string) => (state: RootState) => {
    const periods = periodsSelectors.getByProjectId(projectId)(state);
    const periodIds = Object.keys(periods);

    const projectPlannedSellQuantity = [] as PlannedSellQuantity[];

    periodIds.forEach(item => {
      const periodPlannedSellQuantityByProducts =
        this.getByPeriodId(item)(state);
      const periodPlannedSellQuantity = Object.values(
        periodPlannedSellQuantityByProducts,
      ).reduce(
        (acc, item) => [...acc, ...Object.values(item)],
        [] as PlannedSellQuantity[],
      );

      projectPlannedSellQuantity.push(...periodPlannedSellQuantity);
    });

    return projectPlannedSellQuantity;
  };
  public static getTotalPlannedSellQuantityByPeriods =
    (projectId: string) => (state: RootState) => {
      const projectPlannedSellQuantity = this.getByProjectId(projectId)(state);

      const total = projectPlannedSellQuantity.reduce(
        (acc, item) => ({
          ...acc,
          [item.periodId]: (acc[item.periodId] || 0) + Number(item.quantity),
        }),
        {} as { [periodId: string]: number },
      );

      return total;
    };
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
