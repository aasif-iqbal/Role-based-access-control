import { userPermissionModel } from "../models/user-permissions"; 
import userPermissionHelper from "../helpers/userPermissionHelper";
import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";

const getUserPermission = async (req: Request, res: Response): Promise<void> => {
  
  try {  
    const user_id = req.params.user_id;
  
    const user = await userPermissionHelper(user_id);
  
    const response: ReturnResponse = {
      status: "success",
      message: "User permissions",
      data: user
    }
  
    res.status(200).json(response);
    } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// User permissions will add by admin on user-update endpoint

// PATCH | localhost:3000/v1/user/6763433e75c6d53e4da121b6

export {
    getUserPermission
  }