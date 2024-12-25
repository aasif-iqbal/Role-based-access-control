import { Request, Response, NextFunction } from 'express';
// import { AuthenticatedRequest } from '../utils/interfaces';
export interface AuthenticatedRequest extends Request {
  user?: any; // Define the type of 'user' as needed, e.g., specific fields like `{ id: string, email: string }`
}
const onlyAdminAccess = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {  
  try {
    // console.log(req.user.role);
    if (req.user.role !== 0) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();

  } catch (error) {
    console.error('Error in onlyAdminAccess middleware:', error);
    // Ensure only one response is sent
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }  
};

export default onlyAdminAccess;