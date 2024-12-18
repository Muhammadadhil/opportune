import { ObjectId } from "mongoose";
import { IMessage } from "../../interfaces/IMessage";
import { IBaseRepository } from "./IBaseRepository";

export interface IMessageRepository extends IBaseRepository<IMessage> {
    // createMessage(senderId: ObjectId, receiverId: ObjectId, content: string, chatRoomId: string): Promise<IMessage>;
    // findMessagesByChatRoom(chatRoomId: string): Promise<IMessage[]>;
}
