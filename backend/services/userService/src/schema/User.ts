import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    _id:ObjectId;
    firstname: string;
    lastname: string;
    email: string;  
    location: string;
    password: string;
    role:string;
}

const UserSchema: Schema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    country: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model<IUser>("User", UserSchema);
