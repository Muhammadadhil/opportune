import { GigService } from "../services/implementation/gig.services";
import { Request, Response } from "express";
import { IGigService } from "../services/interfaces/IGigService";
import IUploadFile from "../interfaces/IUploadFile";

export class GigController {
    private gigService: IGigService;

    constructor() {
        this.gigService = new GigService();
    }

    postAGig = async (req: Request, res: Response) => {
        try {
            console.log("req.file using multer:", req.files);
            console.log("req.body:", req.body);

            const files = req.files as IUploadFile[];

            if (!files) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            console.log("Going to save post data !!!!!!");

            const savedGigData = await this.gigService.saveGig(files,req.body);
            res.status(200).json(savedGigData);
        } catch (error) {
            res.status(500).json({ message: "Error saving gig", error });
        }
    };

    editGig = async (req: Request, res: Response) => {
        try {
            const { userId, data } = req.body;
            const updatedData = await this.gigService.editGig(userId, data);
            res.status(200).json(updatedData);
        } catch (error) {
            res.status(500).json({ message: "Error editinzg gig", error });
        }
    };

    changeStatus = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.gigService.changeGigStatus(id);
            res.status(200).json({ message: "status updated successfully!" });
        } catch (error) {
            res.status(500).json(error);
        }
    };
}
