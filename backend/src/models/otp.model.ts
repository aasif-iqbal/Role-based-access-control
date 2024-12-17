import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the document
interface OtpDocument extends Document {
    phone_number: number;
    otp: string;
    createdAt: Date;
}

// Define the schema
const otpSchema: Schema<OtpDocument> = new Schema<OtpDocument>({
    phone_number: {
        type: Number,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 2 // Automatically deleted after 2 minutes
    }
}, {
    timestamps: true
});

// Define the model
const OtpModel: Model<OtpDocument> = mongoose.model<OtpDocument>('OTP', otpSchema);

export default OtpModel;
