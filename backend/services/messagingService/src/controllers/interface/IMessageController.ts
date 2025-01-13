import { Request, Response, NextFunction } from "express";

export interface IMessageController {
    sendMessageHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    getMessagesHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
}
