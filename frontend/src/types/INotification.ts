export enum NotificationType {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

export interface INotification {
    _id: string;
    userId: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: string;
}
