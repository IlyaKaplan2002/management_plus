const namespace = 'PRODUCT';

export const CREATE = `${namespace}/CREATE`;
export const CREATE_MANY = `${namespace}/CREATE_MANY`;
export const GET = `${namespace}/GET`;
export const UPDATE = `${namespace}/UPDATE`;
export const DELETE = `${namespace}/DELETE`;

export interface ProductCreate {
  name: string;
  price: number;
  cost: number;
}

export type Product = ProductCreate & {
  id: string;
  projectId: string;
};

export interface ProductsState {
  items: {
    [projectId: string]: {
      [key: string]: Product;
    };
  };
  loading: boolean;
  fetched: boolean;
  error: string | null;
}
