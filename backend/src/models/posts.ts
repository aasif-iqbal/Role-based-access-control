import mongoose, { Schema, Document, Model } from "mongoose";

interface PostDocument extends Document { 
  title: string;
  description: string;
  category: any;
  author: string;
  createdAt: Date;
  updatedAt: Date;
} 

const postSchema: Schema<PostDocument> = new Schema<PostDocument>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  author: {
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

export const postModel: Model<PostDocument> = mongoose.model<PostDocument>('Post', postSchema);   

