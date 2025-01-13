import { Request,Response, NextFunction } from "express";

export interface IChatController {
    chatRoomHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllChatRooms(req: Request, res: Response, next: NextFunction): Promise<void>;
}