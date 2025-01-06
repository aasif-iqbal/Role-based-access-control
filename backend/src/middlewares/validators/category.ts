import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const categorySchema = Joi.object({
  category_name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(5).max(100).required(),
});

export const validateCategory = (req: Request, res: Response, next: NextFunction) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};