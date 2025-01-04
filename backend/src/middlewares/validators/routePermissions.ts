import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const routePermissionSchema = Joi.object({
  router_endpoint: Joi.string().min(3).max(30).required(),
  method: Joi.string().min(3).max(30).required(),
  role: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Matches a valid MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "ID must be a valid MongoDB ObjectId.",
      "string.empty": "ID is required.",
      "any.required": "ID is required."
    }),
  permission_id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Matches a valid MongoDB ObjectId
    .required()
    .messages({
      'string.pattern.base': 'Permission ID must be a valid MongoDB ObjectId.',
      'string.empty': 'Permission ID is required.',
      'any.required': 'Permission ID is required.', 
    }),
  permissions: Joi.array().required(),
  description: Joi.string().min(5).max(100).required()
}); 

export const validateRoutePermission = (req: Request, res: Response, next: NextFunction) => {
  const { error } = routePermissionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();   
}