import 'dotenv';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookierParser from 'cookie-parser';
import helmet from 'helmet';
import 'express-async-errors';

import './shared/database';

import routes from './routes';
import AppError from '@errors/AppError';
import uploadConfig from '@config/uploadConfig';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000',
    // origin: process.env.CORS_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookierParser());

app.use(routes);

app.use('/files', express.static(uploadConfig.storagePath));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  try {
    if (err instanceof AppError) {
      return res.status(err.statusCod).json({
        status: 'error',
        message: err.message,
        userFriendly: err?.userFriendly,
      });
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  } catch {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

app.listen(3333, () => console.log('Server running listening to port 3333'));
