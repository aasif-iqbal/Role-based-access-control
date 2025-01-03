import mongoose, { ObjectId } from 'mongoose';
import {userModel} from '../models/users';
import { permission } from 'process';

const userPermissionHelper = async(user_id: any): Promise<any> => {

    try {
        const user = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(user_id) // user_id
                }
            },
            {
                $lookup: {
                    from: "userpermissions",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "permissions"
                }
            },
            {
                $project: {
                    _id: 1,
                    role: 1,
                    permissions:{
                        $cond: {
                            if: { $isArray: "$permissions" },
                            then: { $arrayElemAt: ["$permissions", 0] },    
                            else: []
                        }
                    }
                }
            },
            {
                $addFields: {
                    "permissions": {
                        "permissions": "$permissions.permissions"
                    }
                    
                }
            }
        ])

        if(!user){
            return null;
        }
        
        return user[0];
            
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};      

export default userPermissionHelper;