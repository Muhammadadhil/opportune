import { Document, ObjectId } from "mongoose";

export default interface IUser extends Document {
    _id: ObjectId;
    firstname: string;
    lastname: string;
    email: string;
    location: string;
    password?: string;
    role: string;
}
