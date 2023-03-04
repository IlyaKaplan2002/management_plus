const namespace = 'AUTH';

export const LOGIN = `${namespace}/LOGIN`;
export const REGISTER = `${namespace}/REGISTER`;
export const LOGOUT = `${namespace}/LOGOUT`;
export const GET_CURRENT_USER = `${namespace}/GET_CURRENT_USER`;
export const REFRESH_TOKEN = `${namespace}/REFRESH_TOKEN`;

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
  refreshing: boolean;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
