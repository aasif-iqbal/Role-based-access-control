import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the document
interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: number;
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
        type: Number,
        default: 0 // 0->Normal-User, 1->Admin, 2->Sub-Admin, 3->Editor
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