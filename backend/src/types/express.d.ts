/*
If you want req.user to be universally accessible without importing the custom AuthenticatedRequest interface in every file, extend the global Express.Request.
*/

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        email: string;
        role: number;
        // Add additional user properties as needed
      };
    }
  }
}
