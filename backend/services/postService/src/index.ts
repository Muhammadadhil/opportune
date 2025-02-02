import "reflect-metadata";
import express from "express";
import router from "./routes/router";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectMongoDB } from "@_opportune/common";
import { errorHandler } from "@_opportune/common";
import { InitialiseConsumers } from "./events/rabbitmq/InitialiseConsumers";

const app = express();
dotenv.config();

const allowedOrigins = [process.env.LOCAL_ORIGIN?.replace(/\/$/, ""), process.env.VERCEL_ORIGIN?.replace(/\/$/, ""), process.env.PRODUCTION_ORIGIN?.replace(/\/$/, "")];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);

app.use(errorHandler);

connectMongoDB(process.env.MONGODB_URL!, "posts");

const PORT = process.env.PORT || 3020;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`posts server is running on the port ${PORT}`);
        });
        InitialiseConsumers();
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
