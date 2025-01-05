import {verifyAuthToken} from '../services/authService';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { ReturnResponse } from '../utils/interfaces';

const Auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  
  try {  
      const token: any | undefined = req.headers['authorization']?.split(' ')[1] || req.cookies.token;
      
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
      next();
  } catch (error) {
    
    const response: ReturnResponse = {
      status: "error",
      message: "Unauthorized",
      data: []  
    }
    res.status(401).json(response);
    return;
  }  
}

export default Auth;