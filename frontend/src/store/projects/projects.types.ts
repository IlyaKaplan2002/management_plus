const namespace = 'PROJECT';

export const RESET_CURRENTLY_CREATING = `${namespace}/RESET_CURRENTLY_CREATING`;
export const GET = `${namespace}/GET`;
export const CREATE = `${namespace}/CREATE`;
export const UPDATE = `${namespace}/UPDATE`;
export const DELETE = `${namespace}/DELETE`;

export interface ProjectCreate {
  name: string;
  description: string;
}

export type Project = ProjectCreate & {
  id: string;
  userId: string;
  lastUpdate: Date;
};

export interface ProjectsState {
  items: {
    [key: string]: Project;
  };
  loading: boolean;
  fetched: boolean;
  error: string | null;
  currentlyCreating: string | null;
}
