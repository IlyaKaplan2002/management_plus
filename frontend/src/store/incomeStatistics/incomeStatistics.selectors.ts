import { periodsSelectors } from 'store/periods';
import { RootState } from '../types';
import { IncomeStatistics } from './incomeStatistics.types';

const STATE_KEY = 'incomeStatistics';

export default class IncomeStatisticsSelectors {
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
    const projectIncomeStatistics = [] as IncomeStatistics[];

    periodIds.forEach(item => {
      const periodIncomeStatisticsByProducts = this.getByPeriodId(item)(state);
      const periodIncomeStatistics = Object.values(
        periodIncomeStatisticsByProducts,
      ).reduce(
        (acc, item) => [...acc, ...Object.values(item)],
        [] as IncomeStatistics[],
      );

      projectIncomeStatistics.push(...periodIncomeStatistics);
    });

    const sorted = projectIncomeStatistics.sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
    );

    return sorted.slice(0, 5);
  };
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
