import { ObjectId } from "mongoose";
import { routePermissionModel } from "../models/router-permissions";

const routePermissionHelper = async(router_endpoint: string, method: string, role: any): Promise<any> => {

  try {
    
    const routerPermissions = await routePermissionModel.findOne({ router_endpoint, method, role }).populate("permission_id");
console.log('routerPermissions',routerPermissions);
    if(!routerPermissions){
      throw new Error(`Route permissions not found for route: ${router_endpoint} and method: ${method}`);
      return;
    }
    return routerPermissions;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export default routePermissionHelper;