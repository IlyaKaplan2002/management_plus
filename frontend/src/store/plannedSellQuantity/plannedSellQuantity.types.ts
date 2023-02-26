const namespace = 'PLANNED_SELL_QUANTITY';

export const CREATE = `${namespace}/CREATE`;
export const GET = `${namespace}/GET`;
export const GET_BY_PROJECT_ID = `${namespace}/GET_BY_PROJECT_ID`;
export const UPDATE = `${namespace}/UPDATE`;

export interface PlannedSellQuantityUpdate {
  quantity: number;
}

export type PlannedSellQuantityCreate = PlannedSellQuantityUpdate & {
  productId: string;
};

export type PlannedSellQuantity = PlannedSellQuantityCreate & {
  id: string;
  periodId: string;
};

export interface PlannedSellQuantityState {
  items: {
    [periodId: string]: {
      [key: string]: PlannedSellQuantity;
    };
  };
  loading: boolean;
  fetched: boolean;
  error: string | null;
}
