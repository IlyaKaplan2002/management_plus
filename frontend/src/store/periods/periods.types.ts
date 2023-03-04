const namespace = 'PERIOD';

export const CREATE = `${namespace}/CREATE`;
export const GET = `${namespace}/GET`;
export const UPDATE = `${namespace}/UPDATE`;

export interface PeriodCreate {
  startDate: Date;
}

export interface PeriodUpdate {
  endDate: Date;
}

export type Period = PeriodCreate & {
  id: string;
  endDate: Date | null;
  projectId: string;
};

export interface PeriodsState {
  items: {
    [projectId: string]: {
      [key: string]: Period;
    };
  };
  loading: boolean;
  fetched: boolean;
  error: string | null;
}
