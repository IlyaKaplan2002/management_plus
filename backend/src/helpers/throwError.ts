import { Error as CustomError } from '@types';

export const createError = (message: string, status: number) => {
  const error = new Error(message) as CustomError;
  error.status = status;
  error.data = null;
  return error;
};

const throwError = (message: string, status: number) => {
  const error = createError(message, status);
  throw error;
};

export default throwError;
