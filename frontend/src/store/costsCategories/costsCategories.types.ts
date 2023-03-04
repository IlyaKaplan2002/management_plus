const namespace = 'COSTS_CATEGORY';

export const CREATE = `${namespace}/CREATE`;
export const CREATE_MANY = `${namespace}/CREATE_MANY`;
export const GET = `${namespace}/GET`;
export const DELETE = `${namespace}/DELETE`;

export interface CostsCategoryCreate {
  name: string;
}

export type CostsCategory = CostsCategoryCreate & {
  id: string;
  projectId: string;
};

export interface CostsCategoriesState {
  items: {
    [projectId: string]: {
      [key: string]: CostsCategory;
    };
  };
  loading: boolean;
  fetched: boolean;
  error: string | null;
}
