import mongoose, { Schema, Document, Model } from "mongoose";
// Define the interface for the document
interface RoutePermissionDocument extends Document {
  router_endpoint: string;
  roles: number;            // 0-admin, 1-subadmin, 2-editor, 3-User
  permission: number;       // 0-read 1-write, 2-update, 3-delete
  // permission: Array<number>; //[0,1,2]
  createdAt: Date;
  updatedAt: Date;  
}

const routePermissionSchema: Schema<RoutePermissionDocument> = new Schema<RoutePermissionDocument>({
  router_endpoint: {
    type: String,
    required: true
  },
  roles: {
    type: Number,
    required: true
  },
  permission: {
    type: Number,
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

export const routePermissionModel: Model<RoutePermissionDocument> = mongoose.model<RoutePermissionDocument>('RoutePermission', routePermissionSchema);  