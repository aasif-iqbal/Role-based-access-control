import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { userModel } from "../models/users";

const createUser = async (req: Request, res: Response): Promise<void> => {
  
  const { name, email, password, role } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    const response: ReturnResponse = {
      status: "error",
      message: "User already exists",
      data: []
    }
    res.status(400).json(response); 
  }
  
  const user = await userModel.create(req.body);

  const response: ReturnResponse = {
    status: "success",
    message: "User created successfully",
    data: user
  }

  res.status(201).json(response);
}

export {
  createUser
}