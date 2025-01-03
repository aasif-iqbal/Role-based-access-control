import mongoose, { Schema, Document, Model } from "mongoose";
// Define the interface for the document
interface RoutePermissionDocument extends Document {
  router_endpoint: string;
  method: string;
  role: mongoose.Schema.Types.ObjectId; // ref: 'Role'
  permission_id: mongoose.Schema.Types.ObjectId;
  permissions: Array<number>; //[0,1,2]
  description: string;
  createdAt: Date;
  updatedAt: Date;  
}

const routePermissionSchema: Schema<RoutePermissionDocument> = new Schema<RoutePermissionDocument>({
  router_endpoint: {
    type: String,
    required: true      // '/v1/posts'
  },
  method: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role', 
    required: true,
  },
  permission_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
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

// Add a unique index to ensure the combination of role, route, and method is unique
routePermissionSchema.index({ role: 1, route: 1, method: 1 }, { unique: true });

export const routePermissionModel: Model<RoutePermissionDocument> = mongoose.model<RoutePermissionDocument>('RoutePermission', routePermissionSchema);  