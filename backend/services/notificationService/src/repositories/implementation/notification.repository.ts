
import { BaseRepository } from "./baseRepository";
import { INotification } from "../../interfaces/INotification";
import { INotificationRepository } from "../interfaces/INotificationRepository";
import { Model } from "mongoose";

export class NotificationRepository extends BaseRepository<INotification> implements INotificationRepository {
    private notificationModel: Model<INotification>;
    constructor(notificationModel: Model<INotification>) {
        super(notificationModel);
        this.notificationModel = notificationModel;
    }

    async getUnReadNotifications(userId: string): Promise<INotification[]> {
        return await this.notificationModel.find({ userId, isRead: false });
    }
}
