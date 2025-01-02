import {app} from './app';
import dotenv from 'dotenv';
import db_connection from './config/db';

dotenv.config();

const port = process.env.PORT || 3000;

//First establish the connection
//Second it set Port to run server

db_connection().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.log(err);
});

