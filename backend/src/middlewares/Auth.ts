import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const Auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  } 

  token.split(' ')[1];

  try {
    jwt.verify(token, 'secret');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }  
}

export default Auth