import { RootState } from '../types';
import { fillMissedMonths, getSumForMonth } from './statistics.helpers';
import { FullChartData } from '../types';
const STATE_KEY = 'statistics';

export default class StatisticsSelectors {
  public static getProjectStatistics =
    (projectId: string) => (state: RootState) =>
      state[STATE_KEY].items[projectId] || null;

  public static getError = (state: RootState) => state[STATE_KEY].error;

  public static getProfitableChartData =
    (projectId: string) =>
    (state: RootState): FullChartData => {
      const projectStatistics = this.getProjectStatistics(projectId)(state);

      if (!projectStatistics) return { chartData: [], brushData: [] };

      const months = Object.keys(projectStatistics).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      );

      const fullMonths = fillMissedMonths(months);

      const result: FullChartData = fullMonths.reduce(
        (acc, month, i) => {
          acc.brushData.push({ name: month, value: i });

          const data: {
            costs: number;
            incomes: number;
            profitability: number;
          } = projectStatistics[month]
            ? getSumForMonth(projectStatistics[month])
            : { costs: 0, incomes: 0, profitability: 0 };

          acc.chartData.push({
            label: month,
            Profitability: data.profitability,
            Costs: data.costs,
            Incomes: data.incomes,
            fill: 'green',
          });
          return acc;
        },
        {
          chartData: [],
          brushData: [],
        } as FullChartData,
      );

      return result;
    };
}
