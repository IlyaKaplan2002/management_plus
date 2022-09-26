export const namespace = 'AUTH';
export const LOGIN = `${namespace}/LOGIN`;
export const LOGOUT = `${namespace}/LOGOUT`;
export const REFRESH_TOKEN = `${namespace}/REFRESH_TOKEN`;
export const SET_USER = `${namespace}/SET_USER`;

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  error: null | string;
  loading: boolean;
}

export interface LoginProps {
  email: string;
  password: string;
}
