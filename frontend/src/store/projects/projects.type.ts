const namespace = 'PROJECT';

export const CREATE = `${namespace}/CREATE`;
export const GET = `${namespace}/GET`;

export interface ProjectCreate {
  name: string;
  description: string;
}

export type Project = ProjectCreate & { id: string; userId: string };

export interface ProjectsState {
  items: {
    [key: string]: Project;
  };
  loading: boolean;
  error: string | null;
}
