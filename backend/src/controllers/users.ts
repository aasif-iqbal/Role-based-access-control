import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { userModel } from "../models/users";

const registration = async (req: Request, res: Response): Promise<void> => {
  
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

const login = async(req: Request, res: Response): Promise<void> => {
  try{  
      const { email, password } = req.body;

      const user: any = await userModel.findOne({ email });

      if (!user) {
        const response: ReturnResponse = {
          status: "error",
          message: "User not found",
          data: []
        }
        res.status(400).json(response); 
      }
      
      if(user){
        if(user.password !== password){
          const response: ReturnResponse = {
            status: "error",
            message: "Invalid password",
            data: []
          }
          res.status(400).json(response);
        }         
      }

      const response: ReturnResponse = {
        status: "success",
        message: "User logged in successfully",
        data: user 
      }

      res.status(200).json(response);      
  }catch(err){
    console.log(err);
  }
}

export {
  registration,
  login
}