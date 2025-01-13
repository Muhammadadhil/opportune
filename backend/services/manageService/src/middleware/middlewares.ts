import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";

export const setupMiddlewares = (app: Application): void => {
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        })
    );
    app.use(express.json());
    app.use(morgan("dev"));
};
