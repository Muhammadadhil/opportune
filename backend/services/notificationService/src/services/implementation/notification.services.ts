
import { ObjectId } from "mongoose";
import { INotificationRepository } from "../../repositories/interfaces/INotificationRepository";
import { INotificatoinService } from "../interfaces/INotificationService";

import dotenv from "dotenv";
import { NotificationType } from "../../enums/NotificatoinStatus";
import { INotification } from "../../interfaces/INotification";
import { getIo } from "../../config/socketServer";
import { UserType } from "../../enums/UserType";

dotenv.config();

export class NotificationService implements INotificatoinService {
    private _notificationRepository: INotificationRepository;

    constructor(private readonly notificationRepository: INotificationRepository) {
        this._notificationRepository = notificationRepository;
    }

    async createNotification(userId: ObjectId, message: string, type: NotificationType): Promise<INotification> {
        const notification = await this._notificationRepository.create({ userId, message, type } as INotification);
        const io = getIo();
        io.to(userId.toString()).emit("newNotification", notification);

        return notification;
    }

    async createAdminNotification(title: string, content: string, userType: string = "all"): Promise<INotification> {
        const message = `${title} : ${content}`;
        const type = NotificationType.info;
        const notification = await this._notificationRepository.create({ message, type } as INotification);

        const io = getIo();

        switch (userType) {
            case UserType.ALL:
                io.emit("newNotification", notification);
                break;

            case UserType.FREELANCER:
                io.to("freelancers").emit("newNotification", notification);
                break;

            case UserType.CLIENT:
                io.to("clients").emit("newNotification", notification);
                break;
        }

        return notification;
    }

    async getUserNotifications(userId: ObjectId | string): Promise<INotification[]> {
        return await this._notificationRepository.getUnReadNotifications(userId as string);
    }

    async markAsRead(notificationId: ObjectId): Promise<INotification | null> {
        return await this._notificationRepository.update(notificationId, { isRead: true });
    }

    // async markAllAsRead(notificationId: ObjectId): Promise<INotification | null> {
    //     return await this._notificationRepository.update(notificationId, { isRead: true });
    // }
}
