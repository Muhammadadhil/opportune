import { ObjectId } from "mongoose"
import { NotificationType } from "../../enums/NotificatoinStatus"
import { INotification } from "../../interfaces/INotification"

export interface INotificatoinService {
    createNotification(userId: ObjectId, message: string, type: NotificationType): Promise<INotification>;
    createAdminNotification(title:string, content:string, userType:string): Promise<INotification>;
    getUserNotifications(userId: ObjectId | string): Promise<INotification[]>;
    markAsRead(notificationId: ObjectId | string): Promise<INotification | null>;
}