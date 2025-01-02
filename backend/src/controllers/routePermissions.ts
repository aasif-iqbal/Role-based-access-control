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
This controller is user to add & update route permissions
POST | localhost:3000/v1/route-permissions/add

{
    "router_endpoint":"/v1/permission",
    "method":"GET",
    "roles":1,
    "permissions":[0,1],
    "description":"Grant Permissions to admin to ONLY READ"
}
    handle duplication of endpoints
{
    "router_endpoint":"/v1/permission",
    "method":"POST",
    "roles":1,
    "permissions":[0,1],
    "description":"Grant Permissions to admin to ONLY READ"
}

*/ 
const addRoutePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { router_endpoint, method, roles, permissions, description } = req.body;

    // check for unique router_endpoint and method combination {"/v1/user", "GET"} & {"/v1/user", "POST"}

    const routePermission:any = await routePermissionModel.findOneAndUpdate(
      { router_endpoint, method, roles }, 
      { router_endpoint, method, roles, permissions, description }, 
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const response: ReturnResponse = {
      status: "success",
      message: "Route permission added successfully",
      data: routePermission
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  } 
}

export { getAllRoutes, addRoutePermission };
