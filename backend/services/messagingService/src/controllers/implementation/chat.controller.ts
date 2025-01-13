import { IChatService } from "../../services/interfaces/IChatService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../interfaces/types";
import { IChatController } from "../interface/IChatController";
import { Request, Response,NextFunction } from "express";
import { IChatRoom } from "../../interfaces/IChatRoom";
import { ObjectId, Types } from "mongoose";

@injectable()
export class ChatController implements IChatController {
    private _chatService: IChatService;

    constructor(@inject(TYPES.IChatService) private chatService: IChatService) {
        this._chatService = chatService;
        this.chatRoomHandler = this.chatRoomHandler.bind(this);
        this.getAllChatRooms = this.getAllChatRooms.bind(this);
    }


    async chatRoomHandler(req:Request,res:Response,next:NextFunction){
        try {
            const { clientId, freelancerId } = req.body;

            const chatRoom = await this._chatService.chatRoom(clientId, freelancerId);
            res.status(200).json(chatRoom);

            
        } catch(error){
            next(error);
        }
    }

    async getAllChatRooms(req:Request,res:Response,next:NextFunction){
        try {
            const { userId } = req.params;
            const id = new Types.ObjectId(userId);

            const chatRooms = await this._chatService.getAllChatRooms(id as unknown as ObjectId);
            res.status(200).json(chatRooms);
        } catch(error){
            next(error);
        }
    }




    
}    