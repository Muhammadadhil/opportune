import { NextFunction, Request, Response } from "express";
import { ISubmissionService } from "../services/interfaces/ISubmissionService";

export class SubmissionController {
    private _submissionService: ISubmissionService;

    constructor(submissionService: ISubmissionService) {
        this._submissionService = submissionService;
    }

    submitWork = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const submission = await this._submissionService.submitWork(req.body, req.file!);
            return res.status(201).json(submission);
        } catch (error) {
            console.log("Error in submitting work:", error);
            next(error);
        }
    };
}
