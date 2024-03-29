import { periodsSelectors } from 'store/periods';
import { RootState } from '../types';
import { CostsStatistics } from './costsStatistics.types';

const STATE_KEY = 'costsStatistics';

export default class CostsStatisticsSelectors {
  public static getAll = (state: RootState) => state[STATE_KEY].items;
  public static getByPeriodId = (periodId: string) => (state: RootState) =>
    state[STATE_KEY].items[periodId] || {};
  public static getByProjectId = (projectId: string) => (state: RootState) => {
    const periods = periodsSelectors.getByProjectId(projectId)(state);
    const periodIds = Object.keys(periods);
    const projectCostsStatistics = [] as CostsStatistics[];

    periodIds.forEach(item => {
      const periodCostsStatisticsByPeriods = this.getByPeriodId(item)(state);

      const periodCostsStatistics = Object.values(
        periodCostsStatisticsByPeriods,
      );

      projectCostsStatistics.push(...periodCostsStatistics);
    });

    return projectCostsStatistics;
  };
  public static getLastItems = (projectId: string) => (state: RootState) => {
    const projectCostsStatistics = this.getByProjectId(projectId)(state);

    const sorted = projectCostsStatistics.sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
    );

    return sorted.slice(0, 5);
  };
  public static getTotalCostsByPeriods =
    (projectId: string) => (state: RootState) => {
      const projectCostsStatistics = this.getByProjectId(projectId)(state);

      return projectCostsStatistics.reduce(
        (acc, item) => ({
          ...acc,
          [item.periodId]: (acc?.[item.periodId] || 0) + Number(item.costs),
        }),
        {} as { [periodId: string]: number },
      );
    };
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
