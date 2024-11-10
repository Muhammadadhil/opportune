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

            const savedGigData = await this.gigService.saveGig(files, req.body);
            res.status(200).json(savedGigData);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error saving gig", error });
        }
    };

    editGig = async (req: Request, res: Response) => {
        try {
            console.log("req.boby Edit:", req.body);

            const updatedData = await this.gigService.editGig(req.body.freelancerId, req.body);
            console.log("updateData:", updatedData);

            if (!updatedData) {
                return res.status(404).json({ message: "Error editing gig. no Database response" });
            }

            res.status(200).json(updatedData);
        } catch (error) {
            console.log("Error in edit gig:", error);
            res.status(500).json({ message: "Error editing gig", error });
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

    getGigs = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const gigs = await this.gigService.getGigs(id);
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    getAllGigs = async (req: Request, res: Response) => {
        try {
            const gigs = await this.gigService.getAllGigs();
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json(error);
        }
    };
}
