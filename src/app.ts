/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
const whitelist = ['http://example1.com', 'http://example2.com','http://localhost:5173','http://localhost:3000']
const corsOptions = {
  origin: function (origin:any, callback:any) {
    // if (whitelist.indexOf(origin) !== -1) {
    if (true) {

      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 

app.use(cors(corsOptions));

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Blood Donation API!');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
