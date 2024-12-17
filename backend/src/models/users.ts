import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the document
interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<UserDocument> = new Schema<UserDocument>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
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

const userModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default userModel;