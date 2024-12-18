import mongoose, { Schema, Document } from "mongoose";
import { IMessage } from "../interfaces/IMessage";
import { messageStatus,messageType } from "../enums/MessageStatus";

const messageSchema = new mongoose.Schema<IMessage>(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },
        chatRoom: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: messageType,
            default: messageType.text,
        },
        status: {
            type: String,
            enum: messageStatus,
            default: messageStatus.sent,
        },
        attachmentUrl: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);
const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;

