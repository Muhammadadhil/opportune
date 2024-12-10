import mongoose, { Document, ObjectId } from "mongoose";
import { NotificationType } from "../enums/NotificatoinStatus";
export interface INotification extends Document {
    userId: ObjectId;
    message: string;
    type: NotificationType;
    isRead?: boolean;
}