import mongoose, { Schema, Document, Model } from "mongoose";


// Define the interface for the document
 interface CategoryDocument extends Document {
    category_name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Define the schema for the document
  const CategorySchema: Schema<CategoryDocument> = new Schema<CategoryDocument>({
    category_name: {
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
  
  export const categoryModel: Model<CategoryDocument> = mongoose.model<CategoryDocument>('Category', CategorySchema); 