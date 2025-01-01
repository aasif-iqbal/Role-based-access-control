import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { routePermissionModel } from "../models/router-permissions";

const getAllRoutes = async (req: Request, res: Response): Promise<void> => {
  
  try {  
    // const routePermissions = await routePermissionModel.find();
    const stack = req.app._router.stack;
    stack.forEach((layer: any) => {
      if (layer.route) {
        console.log(layer.route.path, layer.route.methods);
      }
    });
    
    res.status(200).json(stack);

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export { getAllRoutes };
