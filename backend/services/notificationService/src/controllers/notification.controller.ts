import { NextFunction, Request, Response } from "express";
import { INotificatoinService } from "../services/interfaces/INotificationService";
import { ObjectId } from "mongoose";

export class NotificationController {
    private _notificationService: INotificatoinService;

    constructor(private readonly notificationService: INotificatoinService) {
        this._notificationService = notificationService;
    }

    async createNotification(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, message, type } = req.body;
            const notification = await this._notificationService.createNotification(userId, message, type);
            res.status(201).json(notification);
        } catch (error) {
            next(error);
        }
    }

    async getUserNotifications(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const notifications = await this._notificationService.getUserNotifications(userId);
            res.json(notifications);
        } catch (error) {
            next(error);
        }
    }
}    