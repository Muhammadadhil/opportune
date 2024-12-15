import { GigService } from "../../services/implementation/gig.services";
import { NextFunction, Request, Response } from "express";
import { IGigService } from "../../services/interfaces/IGigService";
import IUploadFile from "../../types/IUploadFile";
import { ObjectId, Schema, Types } from "mongoose";
import { inject, injectable } from "inversify";
import { IGigController } from "../interface/IGigController";
import { TYPES } from "../../types/types";

@injectable()
export class GigController implements IGigController {
    private gigService: IGigService;

    constructor(@inject(TYPES.IGigService) gigService: IGigService) {
        this.gigService = gigService;
    }

    postAGig = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const files = req.files as IUploadFile[];

            if (!files) {
                res.status(400).json({ message: "No file uploaded" });
                return;
            }

            const savedGigData = await this.gigService.saveGig(files, req.body);
            res.status(200).json(savedGigData);
        } catch (error) {
            next(error);
        }
    };

    editGig = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedData = await this.gigService.editGig(req.body);
            if (!updatedData) {
                res.status(404).json({ message: "Error editing gig. no Database response" });
                return ;
            }
            res.status(200).json(updatedData);
        } catch (error) {
            next(error);
        }
    };

    changeStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = new Types.ObjectId(req.params.id);
            await this.gigService.changeGigStatus(id as unknown as Schema.Types.ObjectId);
            res.status(200).json({ message: "status updated successfully!" });
        } catch (error) {
            next(error);
        }
    };

    getGigs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const gigs = await this.gigService.getGigs(id);
            res.status(200).json(gigs);
        } catch (error) {
            next(error);
        }
    };

    getAllGigs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gigs = await this.gigService.getAllGigs();
            res.status(200).json(gigs);
        } catch (error) {
            next(error);
        }
    };
}

