export default interface CustomError extends Error {
  code?: number;
  status?: number;
  data?: any;
}
