import { ObjectId } from "mongoose";
import { IChatRoom } from "../../interfaces/IChatRoom";

export interface IChatService {
    chatRoom(clientId: ObjectId, freelancerId: ObjectId): Promise<any>;
    getAllChatRooms(userId: ObjectId): Promise<IChatRoom[]>;
}