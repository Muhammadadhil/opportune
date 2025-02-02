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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const NotificatoinStatus_1 = require("../../enums/NotificatoinStatus");
const socketServer_1 = require("../../config/socketServer");
const UserType_1 = require("../../enums/UserType");
dotenv_1.default.config();
class NotificationService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
        this._notificationRepository = notificationRepository;
    }
    createNotification(userId, message, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = yield this._notificationRepository.create({ userId, message, type });
            const io = (0, socketServer_1.getIo)();
            io.to(userId.toString()).emit("newNotification", notification);
            return notification;
        });
    }
    createAdminNotification(title_1, content_1) {
        return __awaiter(this, arguments, void 0, function* (title, content, userType = "all") {
            const message = `${title} : ${content}`;
            const type = NotificatoinStatus_1.NotificationType.adminInfo;
            const notification = yield this._notificationRepository.create({ message, type });
            const io = (0, socketServer_1.getIo)();
            switch (userType) {
                case UserType_1.UserType.ALL:
                    console.log('sending notification to all usersss!!!!');
                    io.emit("newNotification", notification);
                    break;
                case UserType_1.UserType.FREELANCER:
                    io.to("freelancer").emit("newNotification", notification);
                    break;
                case UserType_1.UserType.CLIENT:
                    io.to("client").emit("newNotification", notification);
                    break;
            }
            return notification;
        });
    }
    getUserNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._notificationRepository.getUnReadNotifications(userId);
        });
    }
    markAsRead(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._notificationRepository.update(notificationId, { isRead: true });
        });
    }
}
exports.NotificationService = NotificationService;
