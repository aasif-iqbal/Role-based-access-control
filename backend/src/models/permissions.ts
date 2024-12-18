import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the document
interface PermissionDocument extends Document {
  // permission_id: mongoose.Schema.Types.ObjectId;
  permission_name: string;
  is_default: number;  
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the document
const PermissionSchema: Schema<PermissionDocument> = new Schema<PermissionDocument>({
  permission_name: {
    type: String,
    required: true
  },
  is_default: {
    type: Number,
    default: 0 // 
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

export const permissionModel: Model<PermissionDocument> = mongoose.model<PermissionDocument>('Permission', PermissionSchema); 

/*
What is_Default Means
is_Default is a flag used to specify whether a particular permission is automatically included for a role when it is created or initialized.

It uses a numeric value to represent a boolean state:

0 → Not Default: This permission is optional and not automatically assigned to the role.
1 → Default: This permission is mandatory or pre-assigned to the role by default.
*/