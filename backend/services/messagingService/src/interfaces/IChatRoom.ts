import mongoose, {Document, ObjectId } from "mongoose";

export interface IChatRoom extends Document {
    participants: ObjectId[]; 
    lastMessage?: ObjectId;
    lastMessageAt?: Date;
}
