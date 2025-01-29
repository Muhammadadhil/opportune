"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageStatus_1 = require("../enums/MessageStatus");
const messageSchema = new mongoose_1.default.Schema({
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
    },
    chatRoom: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: MessageStatus_1.messageType,
        default: MessageStatus_1.messageType.text,
    },
    status: {
        type: String,
        enum: MessageStatus_1.messageStatus,
        default: MessageStatus_1.messageStatus.sent,
    },
    attachmentUrl: {
        type: String,
        default: null,
    },
    duration: {
        type: Number,
    },
}, {
    timestamps: true,
});
const Message = mongoose_1.default.model("Message", messageSchema);
exports.default = Message;
