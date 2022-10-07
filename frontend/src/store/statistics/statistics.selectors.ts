import { RootState } from '../types';
const STATE_KEY = 'statistics';

export default class StatisticsSelectors {
  public static getProjectStatistics =
    (projectId: string) => (state: RootState) =>
      state[STATE_KEY].items[projectId] || null;

  public static getError = (state: RootState) => state[STATE_KEY].error;
}
