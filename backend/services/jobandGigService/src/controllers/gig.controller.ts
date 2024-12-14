import { GigService } from "../services/implementation/gig.services";
import { NextFunction, Request, Response } from "express";
import { IGigService } from "../services/interfaces/IGigService";
import IUploadFile from "../interfaces/IUploadFile";

export class GigController {
    private gigService: IGigService;

    constructor() {
        this.gigService = new GigService();
    }

    postAGig = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const files = req.files as IUploadFile[];

            if (!files) {
                return res.status(400).json({ message: "No file uploaded" });
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
                return res.status(404).json({ message: "Error editing gig. no Database response" });
            }
            res.status(200).json(updatedData);
        } catch (error) {
            next(error);
        }
    };

    changeStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            await this.gigService.changeGigStatus(id);
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
