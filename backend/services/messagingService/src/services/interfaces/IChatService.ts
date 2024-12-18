import { ObjectId } from "mongoose";

export interface IChatService {
    chatRoom(clientId: ObjectId, freelancerId: ObjectId): Promise<any>;
}