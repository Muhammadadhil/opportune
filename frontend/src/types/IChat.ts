import { IUser } from "./IUser";

export interface ChatState {
    chatRoomId: string;
    sender: IUser;
    receiver: IUser;
}