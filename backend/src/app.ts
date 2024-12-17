import express, { Application } from 'express';
import optRouter from './routes/otp.routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Define routes, middleware, etc.
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware, routes, etc.
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// 
app.use('/v1/', optRouter);


export default app;