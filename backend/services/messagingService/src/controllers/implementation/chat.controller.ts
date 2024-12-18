import { IChatService } from "../../services/interfaces/IChatService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../interfaces/types";
import { IChatController } from "../interface/IChatController";
import { Request, Response,NextFunction } from "express";
import { IChatRoom } from "../../interfaces/IChatRoom";

@injectable()
export class ChatController implements IChatController {
    private _chatService: IChatService;

    constructor(@inject(TYPES.IChatService) private chatService: IChatService) {
        this._chatService = chatService;
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




    
}    