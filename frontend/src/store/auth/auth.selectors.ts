import { RootState } from 'store/types';

export default class AuthSelectors {
  public static getToken = (state: RootState) => state.auth.token;
  public static getUser = (state: RootState) => state.auth.user;
  public static getError = (state: RootState) => state.auth.error;
  public static getLoading = (state: RootState) => state.auth.loading;
}
