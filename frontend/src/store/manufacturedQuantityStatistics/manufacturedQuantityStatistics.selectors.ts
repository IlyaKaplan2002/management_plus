import { periodsSelectors } from 'store/periods';
import { RootState } from '../types';
import { ManufacturedQuantityStatistics } from './manufacturedQuantityStatistics.types';

const STATE_KEY = 'manufacturedQuantityStatistics';

export default class ManufacturedQuantityStatisticsSelectors {
  public static getAll = (state: RootState) => state[STATE_KEY].items;
  public static getByPeriodId = (periodId: string) => (state: RootState) =>
    state[STATE_KEY].items[periodId] || {};
  public static getByPeriodIdAndProductId =
    ({ periodId, productId }: { periodId: string; productId: string }) =>
    (state: RootState) =>
      state[STATE_KEY].items?.[periodId]?.[productId] || {};
  public static getLastItems = (projectId: string) => (state: RootState) => {
    const periods = periodsSelectors.getByProjectId(projectId)(state);
    const periodIds = Object.keys(periods);
    const projectManufacturedQuantityStatistics =
      [] as ManufacturedQuantityStatistics[];

    periodIds.forEach(item => {
      const periodManufacturedQuantityStatisticsByProducts =
        this.getByPeriodId(item)(state);
      const periodManufacturedQuantityStatistics = Object.values(
        periodManufacturedQuantityStatisticsByProducts,
      ).reduce(
        (acc, item) => [...acc, ...Object.values(item)],
        [] as ManufacturedQuantityStatistics[],
      );

      projectManufacturedQuantityStatistics.push(
        ...periodManufacturedQuantityStatistics,
      );
    });

    const sorted = projectManufacturedQuantityStatistics.sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
    );

    return sorted.slice(0, 5);
  };
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
