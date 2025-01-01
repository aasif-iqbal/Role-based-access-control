import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the document
interface PermissionDocument extends Document {
  // permission_id: mongoose.Schema.Types.ObjectId;
  permission_name: string;
  permissions: number[];
  description: string;
  is_default: boolean;   // default_permission
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the document
const PermissionSchema: Schema<PermissionDocument> = new Schema<PermissionDocument>({
  permission_name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: {
    type: [Number],
    enum: [0, 1, 2, 3], // Valid permission values: 0 = Create, 1 = Read, 2 = Update, 3 = Delete
    default: [1], // Default to Read permission if not specified
  },
  is_default: {
    type: Boolean,
    default: false, //false->user not able to access this permission, true->user can access this permission
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
sample 
{
  "_id": "64b2ff82927ad7d9c1e3a529",
  "permission_name": "Comment_permission",
  "permissions": [1, 2], // Read + Update
  "is_default": false,
  "createdAt": "2025-01-01T12:00:00.000Z",
  "updatedAt": "2025-01-01T12:00:00.000Z"
}


What is_Default Means
is_Default is a flag used to specify whether a particular permission is automatically included for a role when it is created or initialized.

It uses a numeric value to represent a boolean state:

false → Not Default: This permission is optional and not automatically assigned to the role.
true → Default: This permission is mandatory or pre-assigned to the role by default.
*/