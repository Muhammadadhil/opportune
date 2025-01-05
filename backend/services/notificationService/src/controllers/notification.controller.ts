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

    async createAdminNotfication(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, content, userType } = req.body;
            console.log(title,content,userType,"::title conttren ,usertype")
            const notification = await this._notificationService.createAdminNotification(title, content, userType);
            res.status(201).json(notification);
        } catch (error) {
            next(error);
        }
    }

    async getUserNotifications(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const notifications = await this._notificationService.getUserNotifications(id);
            res.json(notifications);
        } catch (error) {
            next(error);
        }
    }

    async markAsRead(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const notification = await this._notificationService.markAsRead(id);
            res.json(notification);
        } catch (error) {
            next(error);
        }
    }
}    