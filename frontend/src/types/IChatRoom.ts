export interface IChatRoom {
    _id?:string;
    participants: string[];
    lastMessage?: string;
    lastMessageAt?: Date;
}
