import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { permissionModel } from "../models/permissions";
const createPermission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { permission_name, 
                permissions, 
                description, 
                is_default } = req.body;   

        const existingPermission = await permissionModel.findOne({ permission_name });
        
        if (existingPermission) {
            const response: ReturnResponse = {
                status: "error",
                message: "Permission already exists",
                data: []
            }

            res.status(400).json(response); 
            return;
        }
        
        // for default permission - By default it set to 0 
        if(req.body.is_default){            
            const is_default = req.body.is_default;  
            await permissionModel.updateOne({ is_default: 0 }, { $set: { is_default: 1 } });                 
        }

        const permission = await permissionModel.create(req.body);

        const response: ReturnResponse = {
            status: "success",
            message: "Permission created successfully",
            data: permission
        }
        
        res.status(201).json(response);
        return;

    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

const getPermissions = async (req: Request, res: Response): Promise<void> => {}

const updatePermission = async (req: Request, res: Response): Promise<void> => {}

const deletePermission = async (req: Request, res: Response): Promise<void> => {
    console.log('Id:', req.params.id);
}


export {
    createPermission,
    getPermissions,
    updatePermission,
    deletePermission
}