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

export { getAllRoutes };
