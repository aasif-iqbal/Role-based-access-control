import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
// import { postModel } from "../models/posts";

const getPosts = async (req: Request, res: Response): Promise<void> => {}
const createPost = async (req: Request, res: Response): Promise<void> => {}
const updatePost = async (req: Request, res: Response): Promise<void> => {}
const deletePost = async (req: Request, res: Response): Promise<void> => {}

export {
  getPosts,
  createPost,
  updatePost,
  deletePost
} 
