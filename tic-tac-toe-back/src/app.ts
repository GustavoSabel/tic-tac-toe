/* eslint-disable no-console */
import 'reflect-metadata';
import createError from 'http-errors';
import {
  Application, Request, Response, NextFunction,
} from 'express';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import routes from './routes/index.route';
import express from 'express'
import cors from 'cors'
import { ValidationError } from './core/errors/ValidationError';

export const createServer = () => {
  dotenv.config();

  const port = process.env.SERVER_PORT || 3001;

  const app: Application = express();

  app.use(cors());

  app.use(express.json());

  app.use('/', routes);

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ValidationError) {
      res.status(400);
      res.send({
        errors: err.validations,
      });
      return;
    }

    res.status(500);
    res.send(req.app.get('env') === 'development' ? err : { message: 'Error' });
  });
  
  if (require.main === module) {
    app.listen(port, () => {
      console.debug(`App started on port ${port}`);
    });
  }

  return app;
};

let appPromise: Promise<Application>
console.debug('Creating connection...');
try {
  appPromise = createConnection().then(() => {
    console.debug('Creating server...');
    return createServer();
  })
} catch (error) {
  console.debug('Error creating connection');
  console.error(error);
}

export { appPromise }