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
  [key: string]: StatisticsStore;
}

export interface StatisticsState {
  items: {
    [key: string]: StatisticsItems;
  };
  loading: boolean;
  error: string | null;
}
