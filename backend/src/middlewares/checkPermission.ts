import { Response, NextFunction } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { AuthenticatedRequest } from '../types/authenticated-request';
import routePermissionHelper from "../helpers/routePermissionHelper";
import userPermissionHelper from "../helpers/userPermissionHelper";
import { roleModel } from "../models/roles";
import { Types } from "mongoose";

/*
What checkPermission does?

1. check if user has permission to access this route

Roles may have multiple permissions. but we have to check induvidual permission for each user.

userPermission-- {
  _id: new ObjectId('6763433e75c6d53e4da121b6'),
  role: 0,
  permissions: {
    _id: new ObjectId('6775699645b787f9ceee653b'),
    user_id: new ObjectId('6763433e75c6d53e4da121b6'),
    permissions: [ [Object] ],
    createdAt: 2025-01-01T16:13:10.832Z,
    updatedAt: 2025-01-01T16:13:10.833Z,
    __v: 0
  }
}

*/ 
const checkPermission = async(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {

  try {
    // console.log('checkPermission middleware', req.user?.role);
    
    // if user is not admin
    if (req.user?.role !== 1) { // 1->Admin
      const roleID = await roleModel.findOne({ value: req.user?.role });
      
     //  console.log('roleID',roleID?._id);      
     // console.log('checkPermission middleware', req.method, req.originalUrl, roleID?._id);
      
     // check if user has permission to access this route
      const routePermission = await routePermissionHelper(req.originalUrl, req.method, roleID?._id);

      if (!routePermission) {
        const response: ReturnResponse = {
            status: "error",
            message: "Forbidden",
            data: []
        } 
        res.status(403).json(response);
        return;
      }
      
      const userPermissions = await userPermissionHelper(req.user?._id);

      if(!userPermissions){
        const response: ReturnResponse = {
            status: "error",
            message: "Forbidden-userPermissions",
            data: []
        } 
        res.status(403).json(response);
        return;
      }
      // check if user has permission to access this route 
      if(!userPermissions.permissions.permissions == undefined || !routePermission?.permissions.includes(userPermissions.permissions.permissions)){
        const response: ReturnResponse = {
            status: "error",
            message: "You have not permission to access this route!",
            data: []
        }    
        res.status(400).json(response);
        return;
      }      

      const permission_name = routePermission?.permissions[0]?.permission_name || null;
      
      const permission_value = routePermission?.permissions[0]?.permissions || null;
      
      let hasPermission = userPermissions.permissions.permissions.some((permission: any) => {
        return permission.permission_name === permission_name && 
        permission.permission_value.some((value: any) => value === permission_value);
      })
      
      if(!hasPermission){
        const response: ReturnResponse = {
            status: "error",
            message: "Forbidden",
            data: []
        } 
        res.status(403).json(response);
        return;
      }
    
      
    
      console.log('1.userPermission--', userPermissions);    
      
      console.log('2. routePermission--', routePermission);

      
    }

    

    next(); 
  }catch (error) {
    console.error('Error in checkPermission middleware:', error);
    // Ensure only one response is sent
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal server error.' });
      return; 
    }
  } 
}

export default checkPermission;