import express, { Response, Request, NextFunction } from 'express';
import { userRouter, articleRouter, profileRouter } from 'routes';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use('/api', [userRouter, profileRouter, articleRouter]);

app.get('/', (_, response: Response) => {
  response.send('Welcome to the Conduit API');
});

app.use((request: Request, response: Response) => {
  return response.status(404).json({
    status: 404,
    title: "Hmmm..there doesn't seem to be anything here.",
    description: `Path: ${request.path} does not exist on this server.`,
  });
});

app.use((error: any, _: Request, response: Response, next: NextFunction) => {
  return response.status(error.status).json(error);
});

export default app;
