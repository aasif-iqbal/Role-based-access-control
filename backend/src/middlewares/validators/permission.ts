import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const permissionSchema = Joi.object({
  permission_name: Joi.string().min(3).max(30).required(),
  permissions: Joi.array().items(Joi.number().valid(0, 1, 2, 3)).required(),
  description: Joi.string().min(5).max(100).required(),
  is_default: Joi.number().optional().default(0),
}); 

export const validatePermission = (req: Request, res: Response, next: NextFunction) => {
  const { error } = permissionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();   
}