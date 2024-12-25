
import { BaseRepository } from "./baseRepository";
import { Model, ObjectId } from "mongoose";
import { injectable } from "inversify";
import ChatRoom from "../../schema/chatRoom.schema";
import { IChatRoom } from "../../interfaces/IChatRoom";
import { IChatRepository } from "../interfaces/IChatRepository";

@injectable()
export class ChatRepository extends BaseRepository<IChatRoom> implements IChatRepository {
    constructor() {
        super(ChatRoom);
    }

    async createChatRoom(participants: ObjectId[]): Promise<IChatRoom> {
        const chatRoom = new ChatRoom({
            participants,
            lastMessageAt: new Date(),
        });

        return chatRoom.save();
    }

    async getPopulatedChatRoom(userId: ObjectId): Promise<IChatRoom[]> {
        return ChatRoom.find({ participants: { $in: [userId] } }).populate("participants");
    }
}
