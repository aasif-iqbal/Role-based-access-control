import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { postModel } from "../models/posts";

const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await postModel.find();
    
    const response: ReturnResponse = {
      status: "success",
      message: "Posts",
      data: posts
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postTitle = await postModel.find({ title: req.body.title });
    
    // check if post title already exists
    if(postTitle.length > 0){
      const response: ReturnResponse = {
        status: "error",
        message: "Post title already exists",
        data: []
      }
      res.status(400).json(response);
      return;
    }

    const post = await postModel.create(req.body);
    
    const response: ReturnResponse = {
      status: "success",
      message: "Post created",
      data: post
    }
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });  
  }
}
const updatePost = async (req: Request, res: Response): Promise<void> => {}
const deletePost = async (req: Request, res: Response): Promise<void> => {}

export {
  getPosts,
  createPost,
  updatePost,
  deletePost
} 
