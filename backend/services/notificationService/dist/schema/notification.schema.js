"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NotificatoinStatus_1 = require("../enums/NotificatoinStatus");
const notificationSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        // required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: NotificatoinStatus_1.NotificationType,
        default: NotificatoinStatus_1.NotificationType.info
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Notification = mongoose_1.default.model("Notification", notificationSchema);
exports.default = Notification;
