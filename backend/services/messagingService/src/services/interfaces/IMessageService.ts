import { ObjectId } from "mongoose";
import { IMessage } from "../../interfaces/IMessage";

export interface IMessageService {
    sendMessage(senderId: ObjectId, receiverId: ObjectId, content: string, chatRoomId: string): Promise<IMessage>;
    getMessages(chatRoomId: string): Promise<IMessage[]>;
}
