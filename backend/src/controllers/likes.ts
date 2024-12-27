import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { likeModel } from "../models/likes";

const postLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, postId } = req.body;
    
    const isLiked = await likeModel.findOne({ userId, postId });

    if(isLiked){
        const response: ReturnResponse = {
            status: "error",
            message: "You already liked this post",
            data: []
        }

        res.status(201).json(response); 
    } else {
      
      const like = await likeModel.create(req.body);

      if(like){
        const response: ReturnResponse = {
            status: "success",
            message: "You liked this post",
            data: like  
        }

        res.status(200).json(response);
    } 
    }
  } catch (error) {
    // console.error(error);
    const response: ReturnResponse = {
        status: "error",
        message: "Internal server error",
        data: []  
    }
    res.status(500).json(response);    
  }  
};

const postUnlike = async (req: Request, res: Response): Promise<void> => {
  
  const { postId } = req.body;

};

const deleteLike = async (req: Request, res: Response): Promise<void> => {};

const getLikes = async (req: Request, res: Response): Promise<void> => {

  const { postId } = req.body;

  const likeCount = await likeModel.find({ postId }).countDocuments();

  if(likeCount > 0){
    const response: ReturnResponse = {
        status: "success",
        message: "total likes",
        data: likeCount 
    }

    res.status(200).json(response); 
  } 
};  

export{
  postLike,
  postUnlike,
  deleteLike,
  getLikes
}