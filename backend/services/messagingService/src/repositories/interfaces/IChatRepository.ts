import { ObjectId } from "mongoose";
import { IChatRoom } from "../../interfaces/IChatRoom";
import { IBaseRepository } from "./IBaseRepository";

export interface IChatRepository extends IBaseRepository<IChatRoom> {
    createChatRoom(participants: ObjectId[]): Promise<IChatRoom>;
    getPopulatedChatRoom(userId: ObjectId): Promise<IChatRoom[]>
}
