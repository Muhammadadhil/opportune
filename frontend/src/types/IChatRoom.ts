import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IChatRoom {
    _id: string;
    participants: IUser[];
    lastMessage?: IMessage;
    lastMessageAt?: Date;
}
