import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { routePermissionModel } from "../models/router-permissions";
import { endpoints } from "../app";
import { Endpoint } from "express-list-endpoints";

const getAllRoutes = async (req: Request, res: Response): Promise<void> => {
  
  try {  
    const allRoutes:Endpoint[] = endpoints;

    const response: ReturnResponse = {
      status: "success",
      message: "All routes",
      data: allRoutes 
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/*
This controller is used to add & update route permissions
POST | localhost:3000/v1/route-permissions/add

{
    "router_endpoint":"/v1/permission",
    "method":"GET",
    "roles":1,
    "permission_id":"6764145c894458c033c5c3d4",
    "permissions":[0,1],
    "description":"Grant Permissions to admin to ONLY READ"
}
    GET | localhost:3000/v1/route-permissions/add
    handle duplication of endpoints but different methods
{
    "router_endpoint":"/v1/permission",
    "method":"POST",    
    "roles":1,
    "permission_id":"6764145c894458c033c5c3d4",
    "permissions":[0,1],
    "description":"Grant Permissions to admin to ONLY READ"
}

*/ 
const addRoutePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { router_endpoint, method, role, permission_id, permissions, description } = req.body;
    console.log('req.body',req.body);
    // check for unique router_endpoint and method combination {"/v1/user", "GET"} & {"/v1/user", "POST"}

    const existingRoutePermission = await routePermissionModel.findOne({ router_endpoint, method });

    if (!existingRoutePermission) {
      // create
      const routePermission: any = await routePermissionModel.create(req.body);

      const response: ReturnResponse = {
        status: "success",
        message: "Route permission added successfully",
        data: routePermission
      }
      res.status(201).json(response); 
      return;

    }else{
      // update
      const routePermission:any = await routePermissionModel.findOneAndUpdate(
        { router_endpoint, method, role }, 
        { router_endpoint, method, role, permissions, description }, 
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );  

      const response: ReturnResponse = {
        status: "success",
        message: "Route permission updated successfully",
        data: routePermission   
      }
      
      res.status(201).json(response);
      return;
    }    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  } 
}

/*
GET | localhost:3000/v1/route-permissions

{
    "router_endpoint":"/v1/permission",
    "method":"GET"
}
*/ 

const getRoutePermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const { router_endpoint, method } = req.body;

    if(!router_endpoint || !method){
      const response: ReturnResponse = {
        status: "error",
        message: "Invalid request",
        data: []
      } 
      res.status(400).json(response);
      return; 
    }
    
    const routerPermissions = await routePermissionModel.findOne({ router_endpoint, method }).populate("role").populate("permission_id");
      

    if(!routerPermissions){
      const response: ReturnResponse = {
        status: "error",
        message: "Route permissions not found",
        data: []
      } 
      res.status(404).json(response);
      return; 
    }   

    const response: ReturnResponse = {
      status: "success",
      message: "Route permissions",
      data: routerPermissions
    } 

    res.status(200).json(response);
    return; 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};  


export { 
  getAllRoutes, 
  addRoutePermission, 
  getRoutePermissions,
};
