import { Router } from "express";
import container from "../config/inversify";
import { TYPES } from "../interfaces/types";
import { IChatController } from "../controllers/interface/IChatController";
import { IMessageController } from "../controllers/interface/IMessageController";

const chatController = container.get<IChatController>(TYPES.IChatController);
const messageController = container.get<IMessageController>(TYPES.IMessageController);

const router = Router();

router.post('/chat-room',chatController.chatRoomHandler);
router.get("/messages/:chatRoomId", messageController.getMessagesHandler);
router.get('/user/chats/:userId',chatController.getAllChatRooms);


export default router;
    