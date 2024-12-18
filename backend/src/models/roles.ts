import mongoose, { Schema, Document, Model } from "mongoose";

interface RoleDocument extends Document {
    role_name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}   

const RoleSchema: Schema<RoleDocument> = new Schema<RoleDocument>({
    role_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});   

export const roleModel: Model<RoleDocument> = mongoose.model<RoleDocument>('Role', RoleSchema); 
