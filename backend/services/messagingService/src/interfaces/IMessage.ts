import { Document,ObjectId } from "mongoose";
import { messageStatus } from "../enums/MessageStatus";

export interface IMessage extends Document {
    sender: ObjectId;
    receiver: ObjectId;
    content: string;
    chatRoom: string;
    type?: "text" | "image" | "file";
    status: messageStatus;
    attachmentUrl?: string | null;
}
