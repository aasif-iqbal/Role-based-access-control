import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const postSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(5).max(100).required(),
  category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.pattern.base": "ID must be a valid MongoDB ObjectId.",
    "string.empty": "ID is required.",
    "any.required": "ID is required."
  }),
  author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.pattern.base": "ID must be a valid MongoDB ObjectId.",
    "string.empty": "ID is required.",
    "any.required": "ID is required."
  })
});

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};