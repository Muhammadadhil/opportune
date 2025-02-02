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
exports.NotificationRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const NotificatoinStatus_1 = require("../../enums/NotificatoinStatus");
class NotificationRepository extends baseRepository_1.BaseRepository {
    constructor(notificationModel) {
        super(notificationModel);
        this.notificationModel = notificationModel;
    }
    getUnReadNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userNotifications = yield this.notificationModel.find({ userId, isRead: false }).sort({ createdAt: -1 }).exec();
            const adminNofications = yield this.notificationModel.find({ type: NotificatoinStatus_1.NotificationType.adminInfo, isRead: false }).sort({ createdAt: -1 }).exec();
            return [...adminNofications, ...userNotifications];
        });
    }
}
exports.NotificationRepository = NotificationRepository;
