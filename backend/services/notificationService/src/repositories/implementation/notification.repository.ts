
import { BaseRepository } from "./baseRepository";
import { INotification } from "../../interfaces/INotification";
import { INotificationRepository } from "../interfaces/INotificationRepository";
import { Model } from "mongoose";
import { NotificationType } from "../../enums/NotificatoinStatus";

export class NotificationRepository extends BaseRepository<INotification> implements INotificationRepository {
    private notificationModel: Model<INotification>;
    constructor(notificationModel: Model<INotification>) {
        super(notificationModel);
        this.notificationModel = notificationModel;
    }

    async getUnReadNotifications(userId: string): Promise<INotification[]> {
        const userNotifications =  await this.notificationModel.find({ userId, isRead: false }).sort({ createdAt: -1 }).exec();
        const adminNofications = await this.notificationModel.find({ type: NotificationType.adminInfo, isRead: false }).sort({ createdAt: -1 }).exec();

        return [...adminNofications, ...userNotifications];
    }
}
