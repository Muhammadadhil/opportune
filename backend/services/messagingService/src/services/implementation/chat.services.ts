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

    async chatRoom(clientId: ObjectId, freelancerId: ObjectId): Promise<IChatRoom | null> {

        let chatRoom = await this._chatRepository.findOne({
            participants: { $all: [clientId, freelancerId] },
        }); 
        
        if (!chatRoom) {
            await this._chatRepository.createChatRoom([clientId, freelancerId]);
        }

        return chatRoom;
    }

    async getAllChatRooms(userId:ObjectId): Promise<IChatRoom[]> {
        return this._chatRepository.getPopulatedChatRoom(userId);
    }

    
}
