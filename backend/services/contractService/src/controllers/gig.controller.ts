import { GigService } from "../services/implementation/gig.services";
import { Request, Response } from "express";
import { IGigService } from "../services/interfaces/IGigService";

export class GigController {
    private gigService: IGigService;

    constructor() {
        this.gigService = new GigService();
    }

    getAllGigs = async (req: Request, res: Response) => {
        try {
            const gigs = await this.gigService.getAllGigs();
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json(error);
        }
    };
}
