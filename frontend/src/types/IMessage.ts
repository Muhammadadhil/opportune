export enum messageStatus {
    sent = "sent",
    delivered = "delivered",
    read = "read",
}

export enum messageType {
    text = "text",
    image = "image",
    file = "file",
    videoCallStarted = "videoCallStarted",
    videoCallEnded = "videoCallEnded",
    videoCallMissed = "videoCallMissed",
    videoCallRejected = "videoCallRejected"
}

export interface IMessage {
    _id: string;
    sender: string;
    receiver: string;
    content: string;
    chatRoom: string;
    type: messageType;
    status?: messageStatus;
    attachmentUrl?: string | null;
    createdAt: Date;
    duration?: number;
}


export type newMessage = Omit<IMessage,"_id">;   
