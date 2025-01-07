import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const userPermissionSchema = Joi.object({
  user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().messages({
    "string.pattern.base": "ID must be a valid MongoDB ObjectId.",
    "string.empty": "ID is required.",
    "any.required": "ID is required." 
  }),  
  permissions: Joi.array().optional(),
}); 

export const validateUserPermission = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userPermissionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();   
}