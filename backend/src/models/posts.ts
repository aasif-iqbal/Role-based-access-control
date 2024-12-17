import mongoose, { Schema, Document, Model } from "mongoose";

interface PostDocument extends Document { 
  title: string;
  description: string;
  category: any;
  author: string;
  createdAt: Date;
  updatedAt: Date;
} 

