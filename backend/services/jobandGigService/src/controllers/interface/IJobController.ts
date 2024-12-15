import { NextFunction, Request, Response } from "express";

export interface IJobController {
    getJobs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getJobsByClient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    postJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    editJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    removeJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    applyForJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    approveApplication: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getJobDetails: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getJobDetail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    sendOffer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
