import store from 'store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface Action {
  type: string;
  payload: any;
}
export interface RejectAction extends Action {
  payload: string;
}

export type ChartFill = 'green' | 'red' | 'blue' | 'orange';

export type ChartData = {
  [key: string]: number | string;
};

export interface BrushData {
  name: string;
  value: number;
}

export interface FullChartData {
  chartData: ChartData[];
  brushData: BrushData[];
}
