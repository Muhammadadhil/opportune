import { Document,ObjectId } from "mongoose";
import { messageStatus, messageType } from "../enums/MessageStatus";

export interface IMessage extends Document {
    sender: ObjectId;
    receiver: ObjectId;
    content: string;
    chatRoom: string;
    type?: messageType;
    status: messageStatus;
    attachmentUrl?: string | null;
    duration?: number;
}
