import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { ReturnResponse } from '../utils/interfaces';

const onlyAdminAccess = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {  
  try {
    console.log('onlyAdminAccess middleware', req.user?.role);
    if (req.user?.role !== 1) { // 1->Admin
      const response: ReturnResponse = {
          status: "error",
          message: "Forbidden",
          data: []
      } 
      res.status(403).json(response);
      return; 
    }
    next();

  } catch (error) {
    // console.error('Error in onlyAdminAccess middleware:', error);
    // Ensure only one response is sent
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal server error.' });
      return; 
    }
  }  
};

export default onlyAdminAccess;