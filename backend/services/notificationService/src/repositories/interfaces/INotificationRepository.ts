import { INotification } from "../../interfaces/INotification";
import { IBaseRepository } from "./IBaseRepository";

export interface INotificationRepository extends IBaseRepository<INotification> {
    getUnReadNotifications(userId: string): Promise<INotification[]>
}
