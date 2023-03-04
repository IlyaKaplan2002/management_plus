import { RootState } from 'store/types';

const STATE_KEY = 'auth';

export default class AuthSelectors {
  public static getToken = (state: RootState) => state[STATE_KEY].token;
  public static getRefreshToken = (state: RootState) =>
    state[STATE_KEY].refreshToken;
  public static getUser = (state: RootState) => state[STATE_KEY].user;
  public static getError = (state: RootState) => state[STATE_KEY].error;
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
}
