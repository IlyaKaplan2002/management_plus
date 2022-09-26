import { Response } from 'express';

const createResponse = ({
  res,
  data = null,
  code = 200,
  message = 'success',
}: {
  res: Response;
  data?: any;
  code?: number;
  message?: string;
}) =>
  res.status(code).json({
    code,
    message,
    data,
    status: 'success',
  });

export default createResponse;
