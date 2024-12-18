import { Request, Response, NextFunction } from "express";
import { IMessageService } from "../../services/interfaces/IMessageService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../interfaces/types";
import { IMessageController } from "../interface/IMessageController";

@injectable()
export class MessageController implements IMessageController {
    private _messageService: IMessageService;

    constructor(@inject(TYPES.IMessageService) private messageService: IMessageService) {
        this._messageService = messageService;
    }

    async sendMessageHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { senderId, receiverId, content, chatRoomId } = req.body;

            const message = await this._messageService.sendMessage(senderId, receiverId, content, chatRoomId);
            res.status(201).json(message);
        } catch (error) {
            next(error);
        }
    }


    // get chat history
    async getMessagesHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { chatRoomId } = req.params;

            const messages = await this._messageService.getMessages(chatRoomId);
            res.status(200).json(messages);
        } catch (error) {
            next(error);
        }
    }
}
