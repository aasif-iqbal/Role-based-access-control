import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required(),
});

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};