"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inversify_1 = __importDefault(require("../config/inversify"));
const types_1 = require("../interfaces/types");
const chatController = inversify_1.default.get(types_1.TYPES.IChatController);
const messageController = inversify_1.default.get(types_1.TYPES.IMessageController);
const router = (0, express_1.Router)();
router.post('/chat-room', chatController.chatRoomHandler);
router.get("/messages/:chatRoomId", messageController.getMessagesHandler);
router.get('/user/chats/:userId', chatController.getAllChatRooms);
exports.default = router;
