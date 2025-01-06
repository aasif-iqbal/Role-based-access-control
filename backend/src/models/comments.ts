import mongoose, { Schema, Document, Model } from "mongoose";

interface CommentDocument extends Document {
  user_id: mongoose.Types.ObjectId;
  post_id: mongoose.Types.ObjectId;  
  comment: string;
  createdAt: Date;
  updatedAt: Date;
} 

const CommentSchema: Schema<CommentDocument> = new Schema<CommentDocument>({  
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
  comment: {
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

export const commentModel: Model<CommentDocument> = mongoose.model<CommentDocument>('Comment', CommentSchema);