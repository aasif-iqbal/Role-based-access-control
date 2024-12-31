import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request';

const onlyAdminAccess = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {  
  try {
    console.log('onlyAdminAccess middleware', req.user?.role);
    if (req.user?.role !== 1) { // 1->Admin 
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