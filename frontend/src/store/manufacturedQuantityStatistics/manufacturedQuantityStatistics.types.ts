const namespace = 'MANUFACTURED_QUANTITY_STATISTICS';

export const CREATE = `${namespace}/CREATE`;
export const GET = `${namespace}/GET`;
export const GET_BY_PROJECT_ID = `${namespace}/GET_BY_PROJECT_ID`;
export const CREATE_MANY = `${namespace}/CREATE_MANY`;

export type ManufacturedQuantityStatisticsCreate = {
  creationDate: Date;
  quantity: number;
  cost: number;
  productId: string;
};

export type ManufacturedQuantityStatisticsData =
  ManufacturedQuantityStatisticsCreate & { id: string };

export type ManufacturedQuantityStatistics =
  ManufacturedQuantityStatisticsData & {
    periodId: string;
  };

export interface ManufacturedQuantityStatisticsState {
  items: {
    [periodId: string]: {
      [productId: string]: {
        [key: string]: ManufacturedQuantityStatistics;
      };
    };
  };
  loading: boolean;
  fetched: boolean;
  error: string | null;
}
