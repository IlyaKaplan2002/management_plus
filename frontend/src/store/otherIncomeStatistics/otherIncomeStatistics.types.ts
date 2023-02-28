const namespace = 'OTHER_INCOME_STATISTICS';

export const CREATE = `${namespace}/CREATE`;
export const GET = `${namespace}/GET`;
export const GET_BY_PROJECT_ID = `${namespace}/GET_BY_PROJECT_ID`;

export type OtherIncomeStatisticsCreate = {
  creationDate: Date;
  income: number;
};

export type OtherIncomeStatisticsData = OtherIncomeStatisticsCreate & {
  id: string;
};

export type OtherIncomeStatistics = OtherIncomeStatisticsData & {
  periodId: string;
};

export interface OtherIncomeStatisticsState {
  items: {
    [periodId: string]: {
      [key: string]: OtherIncomeStatistics;
    };
  };
  loading: boolean;
  fetched: boolean;
  error: string | null;
}
