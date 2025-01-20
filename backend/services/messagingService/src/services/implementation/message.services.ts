import { inject, injectable } from "inversify";
import { IMessageRepository } from "../../repositories/interfaces/IMessageRepository";
import { IMessageService } from "../interfaces/IMessageService";
import { TYPES } from "../../interfaces/types";
import { ObjectId } from "mongoose";
import { IMessage } from "../../interfaces/IMessage";

@injectable()
export class MessageService implements IMessageService {
    private _messageRepository: IMessageRepository;

    constructor(@inject(TYPES.IMessageRepository) messageRepository: IMessageRepository) {
        this._messageRepository = messageRepository;
    }

    async sendMessage(senderId: ObjectId, receiverId: ObjectId, content: string, chatRoomId: string, type?: string,duration?:number): Promise<IMessage> {
        console.log("!! creating new msg in db !!");
        return this._messageRepository.create({ sender: senderId, receiver: receiverId, content, chatRoom: chatRoomId , type,duration} as IMessage);
    }

    async getMessages(chatRoomId: string): Promise<IMessage[]> {
        return this._messageRepository.find({ chatRoom: chatRoomId });
    }
}
