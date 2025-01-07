import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { commentModel } from "../models/comments";
import { AuthenticatedRequest } from "../types/authenticated-request";

const getComments = async (req: Request, res: Response): Promise<void> => {}
const createComment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { post_id, comment } = req.body;

    const user_id = req.user?._id;  
    const postComment = await commentModel.create({ user_id, post_id, comment });

    if(postComment){

      const response: ReturnResponse = {
        status: "success",
        message: "Comment created",
        data: postComment
      }
      res.status(201).json(response);
      return;
    }

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });    
  }
}

const updateComment = async (req: Request, res: Response): Promise<void> => {}

const deleteComment = async (req: Request, res: Response): Promise<void> => {}

export {
  getComments,
  createComment,
  updateComment,
  deleteComment
}
