import { BaseRepository } from "./baseRepository";
import { injectable } from "inversify";
import MessageModel from "../../schema/message.schema";
import { IMessage } from "../../interfaces/IMessage";
import { IMessageRepository } from "../interfaces/IMessageRepository";

@injectable()
export class MessageRepository extends BaseRepository<IMessage> implements IMessageRepository {
    constructor() {
        super(MessageModel);
    }


}
