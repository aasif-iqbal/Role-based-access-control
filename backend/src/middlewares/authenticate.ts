import {verifyAuthToken} from '../services/authService';
import { Request, Response, NextFunction } from 'express';

// Extend the Request type to include the 'user' property
export interface AuthenticatedRequest extends Request {
  user?: any; // Define the type of 'user' as needed, e.g., specific fields like `{ id: string, email: string }`
}

const Auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  
  try {  
      const token: string | undefined = req.headers['authorization']?.split(' ')[1] || req.cookies.token;
      
      console.log(token);
      const decodedToken = verifyAuthToken(token as string);
      
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      } 
            
      if (!decodedToken) {
        return res.status(403).json({ message: 'Forbidden' });
      }       
      
      req.user = decodedToken; // Attach user information to the request            
      next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }  
}

export default Auth;