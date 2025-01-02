import mongoose, { Schema, Document, Model } from "mongoose";
// Define the interface for the document
interface RoutePermissionDocument extends Document {
  router_endpoint: string;
  method: string;
  roles: number;            // 0-admin, 1-subadmin, 2-editor, 3-User   
  permissions: Array<number>; //[0,1,2]
  description: string;
  createdAt: Date;
  updatedAt: Date;  
}

const routePermissionSchema: Schema<RoutePermissionDocument> = new Schema<RoutePermissionDocument>({
  router_endpoint: {
    type: String,
    required: true
  },
  method: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    required: true
  },
  roles: {
    type: Number,
    required: true
  },
  permissions: {
    type: [Number],
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

export const routePermissionModel: Model<RoutePermissionDocument> = mongoose.model<RoutePermissionDocument>('RoutePermission', routePermissionSchema);  