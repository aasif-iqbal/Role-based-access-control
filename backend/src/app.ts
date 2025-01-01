import express, { Application } from 'express';
import router from './routes';
// import { getEndpoints } from './utils/getRoutes';
import expressListEndpoints from 'express-list-endpoints';

// import cookieParser from 'cookie-parser';
const app: Application = express();

// Define routes, middleware, etc.
app.use(express.json());

// Middleware to parse cookies
// app.use(cookieParser());

// Middleware, routes, etc.
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

 
app.use('/v1', router);

console.log('Registered Routes:');
// List all endpoints
try {
    // const endpoints = getEndpoints(app);
    // console.log('Registered Endpoints:', endpoints);
    const endpoints = expressListEndpoints(app);

    console.log('npm',endpoints);

  } catch (error: any) {
    console.error('Error fetching endpoints:', error.message);
  }

export default app;