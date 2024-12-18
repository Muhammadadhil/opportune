import mongoose, { Schema, Types } from "mongoose";
import { IChatRoom } from "../interfaces/IChatRoom";

const chatRoomSchema = new Schema<IChatRoom>(
    {
        participants: [
            {
                type: Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        lastMessage: {
            type: Types.ObjectId,
            ref: "Message",
        },
        lastMessageAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const ChatRoom = mongoose.model<IChatRoom>("ChatRoom", chatRoomSchema);

export default ChatRoom;
