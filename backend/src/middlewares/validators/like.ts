import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const LikeSchema = Joi.object({
  user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().messages({
    "string.pattern.base": "ID must be a valid MongoDB ObjectId.",
    "string.empty": "ID is required.",
    "any.required": "ID is required." 
  }),
  post_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.pattern.base": "ID must be a valid MongoDB ObjectId.",
    "string.empty": "ID is required.",
    "any.required": "ID is required." 
  }),  
});

export const validateLike = (req: Request, res: Response, next: NextFunction) => {
  const { error } = LikeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};