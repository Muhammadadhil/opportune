import { NextFunction, Request, Response } from "express";
import { ISubmissionService } from "../services/interfaces/ISubmissionService";

export class SubmissionController {
    private _submissionService: ISubmissionService;

    constructor(submissionService: ISubmissionService) {
        this._submissionService = submissionService;
    }

    submitWork = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("req.body and file:", req.body);

            const submission = await this._submissionService.submitWork(req.body);
            return res.status(201).json(submission);
        } catch (error) {
            console.log("Error in submitting work:", error);
            next(error);
        }
    };

    generateUploadPresignedUrl = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { fileName, fileType } = req.body;
            const { url, fileKey } = await this._submissionService.generatePresignedUrl(fileName, fileType);
            return res.status(200).json({ url, fileKey });
        } catch (error) {
            console.log("Error in generating presigned URL:", error);
            next(error);
        }
    };

    generateDownloadPresignedUrl = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const url = await this._submissionService.generateDownloadPresignedUrl(req.params.fileKey);
            return res.status(200).json(url);
        } catch (error) {
            console.log("Error in generating presigned URL:", error);
            next(error);
        }
    };

    getSubmission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { contractId, milestoneId } = req.params; 
            const submissions = await this._submissionService.getSubmissions(contractId, milestoneId);
            return res.status(200).json(submissions);
        } catch (error) {
            console.log("Error in getting submissions:", error);
            next(error);
        }
    };

    acceptSubmission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("accepting submission:", req.body);
            const { submissionId } = req.body;
            const submission = await this._submissionService.acceptSubmission(submissionId);
            return res.status(200).json(submission);
        } catch (error) {
            console.log("Error in accepting submission:", error);
            next(error);
        }
    };
}
