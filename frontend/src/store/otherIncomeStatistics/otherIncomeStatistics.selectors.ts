import { periodsSelectors } from 'store/periods';
import { RootState } from '../types';
import { OtherIncomeStatistics } from './otherIncomeStatistics.types';

const STATE_KEY = 'otherIncomeStatistics';

export default class OtherIncomeStatisticsSelectors {
  public static getAll = (state: RootState) => state[STATE_KEY].items;
  public static getByPeriodId = (periodId: string) => (state: RootState) =>
    state[STATE_KEY].items[periodId] || {};
  public static getLastItems = (projectId: string) => (state: RootState) => {
    const periods = periodsSelectors.getByProjectId(projectId)(state);
    const periodIds = Object.keys(periods);
    const projectOtherIncomeStatistics = [] as OtherIncomeStatistics[];

    periodIds.forEach(item => {
      const periodOtherIncomeStatisticsByPeriods =
        this.getByPeriodId(item)(state);

      const periodOtherIncomeStatistics = Object.values(
        periodOtherIncomeStatisticsByPeriods,
      );

      projectOtherIncomeStatistics.push(...periodOtherIncomeStatistics);
    });

    const sorted = projectOtherIncomeStatistics.sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
    );

    return sorted.slice(0, 5);
  };
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
