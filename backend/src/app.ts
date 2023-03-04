import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import logger from 'morgan';
// import swaggerUi from 'swagger-ui-express';

import { Error } from '@types';
import { authRouter, projectRouter, userRouter } from '@modules/index';
// import swaggerDocument from './swagger.json';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger(formatsLogger));

// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/user', userRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 'failed', code: 404, message: 'Not found' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  const { status = 500, message } = err;
  res.status(status).json({ status: 'failed', code: status, message });
});

export default app;
