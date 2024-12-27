import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { userModel } from "../models/users";
import { generateAuthToken } from "../services/authService";

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
            
      const payload = { 
        email:user.email, 
        role: user.role 
      };

      const token = generateAuthToken(payload);
      console.log(token);
      // set token header
      res.header('auth-token', token);
      // set token cookie
      res.cookie('token', token, { httpOnly: true });

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

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};  

/*
  Only access by Admin 

  email: "subadmin@gmail.com",
  name: "subadmin",
  password: "subadmin@123",
  role: 1
*/
const createUser = async (req: Request, res: Response): Promise<void> => {
  
  // Name & email
  // generate random password and send mail to user

  if(req.body.role !== 0){
    const response: ReturnResponse = {
      status: "error",
      message: "Only Admin can create users",
      data: []
    }
    res.status(400).json(response); 
  } 

  const user = await userModel.create(req.body);

  // sendMail(user.email, user.password);

  const response: ReturnResponse = {
    status: "success",
    message: "User created successfully",
    data: user
  }

  res.status(201).json(response); 
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
  
} 

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  
}

export {
  registration,
  login,
  getProfile,
  createUser,
  updateUser,
  deleteUser
}