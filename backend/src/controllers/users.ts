import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { userModel } from "../models/users";
import { generateAuthToken } from "../services/authService";
import { permissionModel } from "../models/permissions";
import { userPermissionModel } from "../models/user-permissions";
import mongoose from "mongoose";
import { AuthenticatedRequest } from '../types/authenticated-request';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const registration = async (req: Request, res: Response): Promise<void> => {
  
  const { name, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    const response: ReturnResponse = {
      status: "error",
      message: "User already exists",
      data: []
    }
    res.status(400).json(response); 
    return;
  }
  
  const user = await userModel.create(req.body);

  // Assign default permission
  const defaultPermissions = await permissionModel.find({ is_default: 1 }); // is_default = 1 means user can access this permission like comment, likes

  if(defaultPermissions.length > 0){
    let permissions: any = [];

    defaultPermissions.forEach((permission: any) => {
      permissions.push({
        permission_name: permission.permission_name,
        permission_value: [0, 1, 2, 3]
      })  
    })    

    await userPermissionModel.create({
      user_id: user._id,
      permissions: permissions
    })  
  }

  const response: ReturnResponse = {
    status: "success",
    message: "User created successfully",
    data: user
  }

  res.status(201).json(response);
  return;
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
        _id: user._id,
        email:user.email, 
        role: user.role 
      };

      const token = generateAuthToken(payload);

      // set token header
      res.header('auth-token', token);
      // set token cookie
      res.cookie('token', token, { httpOnly: true });

      // get user-data with all permissions - this will help for frontend to handle permissions and rights of user 
      const userData = await userModel.aggregate([
        {
          $match: {
            email: user.email
          }
        },
        {
          $lookup: {
            from: "userpermissions",
            localField: "_id",
            foreignField: "user_id",
            as: "permissions"
          }
        },
        {
          $project: {
            _id: 1,
            email: 1,
            name: 1,
            role: 1,
            permissions: {
              $cond: {
                if:{$isArray: "$permissions"},
                then: {$arrayElemAt: ["$permissions", 0]},
                else: null
              }
            },
          }
        },{            
              $addFields: {
                "permissions": { 
                  "permissions": "$permissions.permissions"              
            }
          }
        } 
      ]);

      const response: ReturnResponse = {
        status: "success",
        message: "User logged in successfully",
        data: userData 
      }

      res.status(200).json(response);      
  }catch(err){
    console.log(err);
  }
}

const getAllUsers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {     
      const userId = req.user?._id;

      // console.log('userId',userId);
      const user = await userModel.aggregate([
        {
            $match: {
                _id: {
                    $ne: new mongoose.Types.ObjectId(userId), // Exclude the current user
                }                    
            }
          },{
            $lookup: {
                from: "userpermissions",
                localField: "_id",
                foreignField: "user_id",
                as: "permissions"
            }
          },{
            $project: {
                _id: 0
            }
          }        
    ]); 

    const response: ReturnResponse = {
      status: "success",
      message: "Users fetched successfully",
      data: user  
    }

    res.status(200).json(response); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};  


const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await userModel.findById(req.params.id);
      
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    } else {
      res.status(200).json({ user });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};  

/*
  Only access by Admin    
*/
const createUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    
  // generate random password(crypto) and send mail to user
  const { email, name, role, permissions } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    const response: ReturnResponse = {
      status: "error",
      message: "User already exists",
      data: []
    }

    res.status(400).json(response); 
    return;
  }
  const password = crypto.randomBytes(4).toString('hex');
  const hashedPassword = await bcrypt.hash(password, 10); 
  
  const userObj = {
    name,
    email,
    password: hashedPassword,
    role   
  }

  if(req.user?.role !== 1){ // 1 means admin
    const response: ReturnResponse = {
      status: "error",
      message: "This role is reserved for admin",
      data: []
    }
    res.status(400).json(response); 
    return;
  } else if(req.body.role){ // 1 means admin
    userObj.role = req.body.role as number;
  }

  const user = new userModel(userObj);
  const userData = await user.save();

  // const user:any = [];
  // Add Permissions to user from admin dashboard
  if(req.body.permissions !== undefined && req.body.permissions.length > 0){
  
    const permissionArray: any[] = [];
  
    const permissions = req.body.permissions;
  
    console.log('permissions', permissions);
  
    await Promise.all(
      permissions.map(async (permission: any) => {
          console.log('permission-map', permission);
        const permissionData = await permissionModel.findOne({ _id: permission.id }) as any;

        if (!permissionData) {
          throw new Error("Permission not found");
        }

        console.log('permissionData', permissionData);
      
        permissionArray.push({
          permission_name: permissionData?.permission_name,
          permission_value: permission?.value
        });
      })
  );     

  //if admin is created User - send Mail to User with there user name and password 
  // const userEmailTemplate = `<h3>Hi,${userData.name} your password:${userData.password}</h3>`;

  const userPermission = new userPermissionModel({
    user_id: userData?._id,
    permissions: permissionArray
  })

  await userPermission.save(); 
  }

  // const user = await userModel.create(req.body);
  // sendMail(user.email, user.password);
  const response: ReturnResponse = {
    status: "success",
    message: "User created successfully",
    data: user
  }

  res.status(201).json(response); 
  return;
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const { name, email, password, role } = req.body;      
    
    const id: any = req.params.id; 
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid ObjectId format" });
      return;
    }

    const user = await userModel.findById(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const _user: any = {}

    if (name) _user.name = name;
    if (email) _user.email = email;
    // hased password before update
    if (password) _user.password = password; 
    if (role) _user.role = role;

    
    // update user
    const updatedUser: any = await userModel.findByIdAndUpdate(id, _user, { new: true });
    
    // update user permissions
    if(req.body.permissions !== undefined && req.body.permissions.length > 0){
      const permissionArray: any[] = [];
  
      const permissions = req.body.permissions;
  
      console.log('permissions', permissions);
  
      await Promise.all(
        permissions.map(async (permission: any) => {
          console.log('permission-map', permission);
        const permissionData = await permissionModel.findOne({ _id: permission.id }) as any;

        if (!permissionData) {
          throw new Error("Permission not found");
        } 

        console.log('permissionData', permissionData);
      
        permissionArray.push({
          permission_name: permissionData?.permission_name,
          permission_value: permission?.value
        });
      })      
  );  
  // update user permissions
  const userPermission: any = new userPermissionModel({
    user_id: user?._id,
    permissions: permissionArray
  })

  await userPermission.save(); 
  }

    const response: ReturnResponse = {
      status: "success",
      message: "User updated successfully",
      data: updatedUser
    }

    res.status(200).json(response); 
    return;

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  
}

export {
  registration,
  login,
  getAllUsers,
  getProfile,
  createUser,
  updateUser,
  deleteUser
}