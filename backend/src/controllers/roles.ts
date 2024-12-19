import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { roleModel } from "../models/roles";

const createRoles = async(req: Request, res: Response): Promise<void> => {
    try {            
        const { role_name, value, description } = req.body;

        const existingRole = await roleModel.findOne({ role_name });

        if (existingRole) {
            const response: ReturnResponse = {
                status: "error",
                message: "Role already exists",
                data: []
            }
            res.status(400).json(response); 
        }

        const role = await roleModel.create(req.body)    

        const response: ReturnResponse = {
            status: "success",
            message: "Role created successfully",
            data: role
        }
        res.status(201).json(response);    
    } catch (error) {
            
    }
}   

const getRoles = async(req: Request, res: Response): Promise<void> => {
    
}

export { createRoles };