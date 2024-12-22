import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { permissionModel } from "../models/permissions";
const createPermission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { permission_name } = req.body;   

        const existingPermission = await permissionModel.findOne({ permission_name });
        
        if (existingPermission) {
            const response: ReturnResponse = {
                status: "error",
                message: "Permission already exists",
                data: []
            }
            res.status(400).json(response); 
        }
        
        // for default permission - By default it set to 0
        if(req.body.default){            
            const is_default = req.body.default;  
            await permissionModel.updateOne({ is_default: 0 }, { $set: { is_default: 1 } });                 
        }

        const permission = await permissionModel.create(req.body);

        const response: ReturnResponse = {
            status: "success",
            message: "Permission created successfully",
            data: permission
        }
        
        res.status(201).json(response);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    createPermission
}