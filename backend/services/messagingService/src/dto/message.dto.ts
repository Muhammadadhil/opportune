import { ObjectId } from "mongoose";

type CreateMessageDTO = {
    sender: ObjectId;
    receiver: ObjectId;
    content: string;
    chatRoom: string;
};
