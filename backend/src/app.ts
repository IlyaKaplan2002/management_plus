import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import logger from 'morgan';
import { Error } from '@types';
import { authRouter } from '@modules/index';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger(formatsLogger));

app.use('/auth', authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 'failed', code: 404, message: 'Not found' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  const { status = 500, message } = err;
  res.status(status).json({ status: 'failed', code: status, message });
});

export default app;
