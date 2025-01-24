import { Request, Response, NextFunction } from "express";

export interface IGigController {
    postAGig(req: Request, res: Response, next: NextFunction): Promise<void>;
    editGig(req: Request, res: Response, next: NextFunction): Promise<void>;
    changeStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    getGigs(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllGigs(req: Request, res: Response, next: NextFunction): Promise<void>;
}
