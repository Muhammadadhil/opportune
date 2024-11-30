import { Request, Response, NextFunction } from "express";

import { HTTPError } from "../utils/HttpError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Error handler in Action !!");

    if (err instanceof HTTPError) {
        res.status(err.statusCode).json({ status: "error", message: err.message });
    } else {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong, please try again later.",
        });
    }
};
