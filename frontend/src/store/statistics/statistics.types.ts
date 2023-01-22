const namespace = 'STATISTICS';

export const GET = `${namespace}/GET`;
export const CREATE = `${namespace}/CREATE`;

export type ChartFill = 'green' | 'red' | 'blue' | 'orange';

export interface StatisticsCreate {
  costs: number;
  incomes: number;
  date: Date;
}

export type StatisticsStore = StatisticsCreate & {
  id: string;
  projectId: string;
};

export interface StatisticsItems {
  [statisticsId: string]: StatisticsStore;
}

export interface StatisticsByMonths {
  [month: string]: StatisticsItems;
}

export interface StatisticsState {
  items: {
    [projectId: string]: StatisticsByMonths;
  };
  loading: boolean;
  error: string | null;
}
export interface ChartData {
  label: string;
  Profitability: number;
  Costs: number;
  Incomes: number;
  fill: ChartFill;
}

export interface BrushData {
  name: string;
  value: number;
}

export interface FullChartData {
  chartData: ChartData[];
  brushData: BrushData[];
}
