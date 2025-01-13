export enum messageStatus {
    sent = "sent",
    delivered = "delivered",
    read = "read",
}

export enum messageType {
    text = "text",
    image = "image",
    file = "file",
}

export interface IMessage {
    _id: string;
    sender: string;
    receiver: string;
    content: string;
    chatRoom: string;
    type?: messageType;
    status?: messageStatus;
    attachmentUrl?: string | null;
    createdAt: Date;
}


export type newMessage = Omit<IMessage,"_id">;   
