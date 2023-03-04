const namespace = 'NORMATIVE_PRICE';

export const CREATE = `${namespace}/CREATE`;
export const GET = `${namespace}/GET`;
export const GET_BY_PROJECT_ID = `${namespace}/GET_BY_PROJECT_ID`;
export const UPDATE = `${namespace}/UPDATE`;

export interface NormativePriceUpdate {
  price: number;
}

export type NormativePriceCreate = NormativePriceUpdate & {
  productId: string;
};

export type NormativePrice = NormativePriceCreate & {
  id: string;
  periodId: string;
};

export interface NormativePriceState {
  items: {
    [periodId: string]: {
      [productId: string]: {
        [key: string]: NormativePrice;
      };
    };
  };
  loading: boolean;
  fetched: boolean;
  error: string | null;
}
