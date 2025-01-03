import {verifyAuthToken} from '../services/authService';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request';

const Auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  
  try {  
      const token: any | undefined = req.headers['authorization']?.split(' ')[1] || req.cookies.token;
      
      // console.log('Headers:', req.headers);
      // console.log('Body:', req.body);
      // console.log('Cookies:', req.cookies);

      // console.log('Authorization:',token);
      const decodedToken = verifyAuthToken(token as any);
      
      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return; 
      } 
            
      if (!decodedToken) {
        res.status(403).json({ message: 'Forbidden' });
        return; 
      }       
      
      req.user = decodedToken as any;
      // console.log('req.user',req.user);
      next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }  
}

export default Auth;