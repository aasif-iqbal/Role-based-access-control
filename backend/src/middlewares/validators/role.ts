import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const roleSchema = Joi.object({
  role_name: Joi.string().min(3).max(30).required(),
  value: Joi.number().required(),
  description: Joi.string().min(5).max(100).required()
}); 

export const validateRole = (req: Request, res: Response, next: NextFunction) => {
  const { error } = roleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();   
}