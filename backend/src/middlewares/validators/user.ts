import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required(),
  role: Joi.number().required(),
}); 

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();   
}