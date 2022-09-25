import { genSalt, compare, hash } from 'bcryptjs';

export const getHashedValue = async (data: string) => {
  const salt = await genSalt(10);
  const hashedData = await hash(data, salt);
  return hashedData;
};

export const compareValues = async (data: string, hashedData: string) => {
  const result = await compare(data, hashedData);
  return result;
};
