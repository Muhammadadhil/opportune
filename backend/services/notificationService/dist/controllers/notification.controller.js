"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this._notificationService = notificationService;
    }
    createNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, message, type } = req.body;
                const notification = yield this._notificationService.createNotification(userId, message, type);
                res.status(201).json(notification);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createAdminNotfication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, userType } = req.body;
                console.log(title, content, userType, "::title conttren ,usertype");
                const notification = yield this._notificationService.createAdminNotification(title, content, userType);
                res.status(201).json(notification);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUserNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const notifications = yield this._notificationService.getUserNotifications(id);
                res.json(notifications);
            }
            catch (error) {
                next(error);
            }
        });
    }
    markAsRead(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const notification = yield this._notificationService.markAsRead(id);
                res.json(notification);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.NotificationController = NotificationController;
