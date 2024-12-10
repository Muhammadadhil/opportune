
import { ObjectId } from "mongoose";
import { INotificationRepository } from "../../repositories/interfaces/INotificationRepository";
import { INotificatoinService } from "../interfaces/INotificationService";

import dotenv from "dotenv";
import { NotificationType } from "../../enums/NotificatoinStatus";
import { INotification } from "../../interfaces/INotification";
import { getIo } from "../../config/socketServer";

dotenv.config();

export class NotificationService implements INotificatoinService {
    private _notificationRepository: INotificationRepository;

    constructor(private readonly notificationRepository: INotificationRepository) {
        this._notificationRepository = notificationRepository;
    }

    async createNotification(userId:ObjectId,message:string,type:NotificationType):Promise<INotification> {

        const notification = await this._notificationRepository.create({userId, message, type} as INotification);
        const io= getIo();
        // io.to(userId.toString()).emit("newNotification","you have successfully created a new notification");
        io.emit("newNotification", notification);

        
        return notification;
    }

    async getUserNotifications(userId:ObjectId|string):Promise<INotification[]> {
        return await this._notificationRepository.find({userId})
    }   

    async markAsRead(notificationId:ObjectId):Promise<INotification | null> {
        return await this._notificationRepository.update(notificationId,{isRead:true})
    }



}
