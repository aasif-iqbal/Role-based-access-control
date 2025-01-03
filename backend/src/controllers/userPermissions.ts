import { userPermissionModel } from "../models/user-permissions"; 
import userPermissionHelper from "../helpers/userPermissionHelper";
import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";

const getUserPermission = async (req: Request, res: Response): Promise<void> => {
  
    const user_id = req.params.user_id;
  
    const user = await userPermissionHelper(user_id);
  
    const response: ReturnResponse = {
      status: "success",
      message: "User permissions",
      data: user
    }
  
    res.status(200).json(response);
  }

  export {
    getUserPermission
  }