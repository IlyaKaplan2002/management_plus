const namespace = 'INCOME_STATISTICS';

export const CREATE = `${namespace}/CREATE`;
export const GET = `${namespace}/GET`;
export const GET_BY_PROJECT_ID = `${namespace}/GET_BY_PROJECT_ID`;
export const CREATE_MANY = `${namespace}/CREATE_MANY`;

export type IncomeStatisticsCreate = {
  creationDate: Date;
  quantity: number;
  price: number;
  productId: string;
};

export type IncomeStatisticsData = IncomeStatisticsCreate & { id: string };

export type IncomeStatistics = IncomeStatisticsData & {
  periodId: string;
};

export interface IncomeStatisticsState {
  items: {
    [periodId: string]: {
      [productId: string]: {
        [key: string]: IncomeStatistics;
      };
    };
  };
  loading: boolean;
  fetched: boolean;
  error: string | null;
}
