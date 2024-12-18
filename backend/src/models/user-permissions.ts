import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the document
interface UserPermissionDocument extends Document {
  user_id: any;
  permissions: any;  
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the document 
const UserPermissionSchema: Schema<UserPermissionDocument> = new Schema<UserPermissionDocument>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  },
  permissions: [{
    permission_name: String,
    permission_value: [Number]
  }],   
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});   

export const userPermissionModel: Model<UserPermissionDocument> = mongoose.model<UserPermissionDocument>('UserPermission', UserPermissionSchema); 


/*

permissions: [
  {
    permission_name: 'user',
    permission_value: [0, 1, 2, 3] // 0->Create, 1->Read, 2->Update, 3->Delete
  },
  {
    permission_name: 'post',
    permission_value: [0, 1, 2] // 0->Create, 1->Read, 2->Update, 3->Delete
  },
  {
    permission_name: 'comment',
    permission_value: [0, 1, 2] // 0->Create, 1->Read, 2->Update, 3->Delete
  }
]


 */ 