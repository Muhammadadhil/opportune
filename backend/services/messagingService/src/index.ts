import "reflect-metadata";
import express from "express";
import router from "./routes/route";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectMongoDB } from "@_opportune/common";
import http from "http";
import { initSocketServer } from "./socket/socketServer";
import { errorHandler } from "@_opportune/common";
import { InitialiseConsumers } from "./events/rabbitmq/InitialiseConsumers";

const app = express();
dotenv.config();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);
app.use(errorHandler);

connectMongoDB(process.env.MONGODB_URL!, "messaging");

const PORT = process.env.PORT || 3060;

const server = http.createServer(app);

const startServer = async () => {
    try {
        initSocketServer(server);
        server.listen(PORT, () => {
            console.log(`messaging-server is running on the port ${PORT}`);
        });
        await InitialiseConsumers()
        
    } catch (error) {
        console.log("Error in starting messaging Server", error);
        process.exit(1);
    }
};

startServer();
