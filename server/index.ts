import express, { Response, Request, NextFunction } from 'express';
import { router as userRouter } from '@/routes/user.route';
import { router as profileRouter } from '@/routes/profile.route';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', [userRouter, profileRouter]);

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

app.listen(4000, () => console.info('Started server on: http://localhost:4000'));
