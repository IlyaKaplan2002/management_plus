import { RootState } from 'store/types';

export const getToken = (state: RootState) => state.auth.token;
