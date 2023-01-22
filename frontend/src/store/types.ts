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
