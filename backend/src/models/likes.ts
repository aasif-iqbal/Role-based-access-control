import mongoose, { Schema, Document, Model } from "mongoose";

interface LikeDocument extends Document {
    user_id: mongoose.Types.ObjectId;
    post_id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
  
  const LikeSchema: Schema<LikeDocument> = new Schema<LikeDocument>({
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
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  export const likeModel: Model<LikeDocument> = mongoose.model<LikeDocument>('Like', LikeSchema); 
  
  export default likeModel; 