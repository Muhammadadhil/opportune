
import { BaseRepository } from "./baseRepository";
import { INotification } from "../../interfaces/INotification";
import { INotificationRepository } from "../interfaces/INotificationRepository";
import { Model } from "mongoose";

export class NotificationRepository extends BaseRepository<INotification> implements INotificationRepository {
    constructor(notificationModel: Model<INotification>) {
        super(notificationModel);
    }
}
