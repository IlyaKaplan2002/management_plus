import { RootState } from '../types';

const STATE_KEY = 'periods';

export default class PeriodsSelectors {
  public static getAll = (state: RootState) => state[STATE_KEY].items;
  public static getByProjectId = (projectId: string) => (state: RootState) =>
    state[STATE_KEY].items[projectId] || {};
  public static getCurrentPeriod =
    (projectId: string) => (state: RootState) => {
      const allPeriods = this.getByProjectId(projectId)(state);
      const period = Object.values(allPeriods).find(item => !item.endDate);
      return period || null;
    };
  public static getById =
    ({ projectId, periodId }: { projectId: string; periodId: string }) =>
    (state: RootState) => {
      const allPeriods = this.getByProjectId(projectId)(state);
      return allPeriods?.[periodId] || null;
    };
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
