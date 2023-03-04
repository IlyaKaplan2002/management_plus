const namespace = 'STATISTICS';

export const GET = `${namespace}/GET`;
export const CREATE = `${namespace}/CREATE`;

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
