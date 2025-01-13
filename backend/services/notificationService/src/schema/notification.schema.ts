import mongoose, { Schema } from "mongoose";
import { INotification } from "../interfaces/INotification";
import { NotificationType } from "../enums/NotificatoinStatus";


const notificationSchema = new mongoose.Schema<INotification>(
    {
        userId: {
            type: String,
            // required: true,
        },
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: NotificationType,
            default: NotificationType.info
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
const Notification = mongoose.model<INotification>("Notification", notificationSchema);

export default Notification;
