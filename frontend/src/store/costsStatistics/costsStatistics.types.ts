const namespace = 'COSTS_STATISTICS';

export const CREATE = `${namespace}/CREATE`;
export const GET = `${namespace}/GET`;
export const GET_BY_PROJECT_ID = `${namespace}/GET_BY_PROJECT_ID`;

export type CostsStatisticsCreate = {
  creationDate: Date;
  costs: number;
  costsCategoryId: string;
};

export type CostsStatisticsData = CostsStatisticsCreate & {
  id: string;
};

export type CostsStatistics = CostsStatisticsData & {
  periodId: string;
};

export interface CostsStatisticsState {
  items: {
    [periodId: string]: {
      [key: string]: CostsStatistics;
    };
  };
  loading: boolean;
  fetched: boolean;
  error: string | null;
}
