import { inject, injectable } from "inversify";
import { IChatRepository } from "../../repositories/interfaces/IChatRepository";
import { IChatService } from "../interfaces/IChatService";

import dotenv from "dotenv";
import { TYPES } from "../../interfaces/types";
import { ObjectId } from "mongoose";
import { IChatRoom } from "../../interfaces/IChatRoom";

dotenv.config();

type CreateChatRoom = {
    participants: ObjectId[];
    lastMessage?: ObjectId | null;
    lastMessageAt?: Date | null;
};

@injectable()
export class ChatService implements IChatService {
    private _chatRepository: IChatRepository;

    constructor(@inject(TYPES.IChatRepository) chatRepository: IChatRepository) {
        this._chatRepository = chatRepository;
    }

    async chatRoom(user1: ObjectId, user2: ObjectId): Promise<IChatRoom | null> {

        // let chatRoom = await this._chatRepository.findOne({
        //     participants: { $all: [user1, user2] },
        // }); 

        let chatRoom = await this._chatRepository.getPopulatedChatOfUsers(user1, user2);
        
        if (!chatRoom) {
            await this._chatRepository.createChatRoom([user1, user2]);
        }

        return chatRoom;
    }

    async getAllChatRooms(userId:ObjectId): Promise<IChatRoom[]> {
        return this._chatRepository.getPopulatedChatRoom(userId);
    }

    
}
