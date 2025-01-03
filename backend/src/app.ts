import express, { Application } from 'express';
import router from './routes';
// import { getEndpoints } from './utils/getRoutes';
import expressListEndpoints, { Endpoint } from 'express-list-endpoints';
import cookieParser from 'cookie-parser';

// import cookieParser from 'cookie-parser';
const app: Application = express();

// Define routes, middleware, etc.
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware, routes, etc.
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/v1', router);

const endpoints:Endpoint[] = expressListEndpoints(app);

export {app, endpoints};