import http from "http";
import express from "express";
import router from "./routes/route";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { intialiseConsumers } from "./config/container";
import { initSocketServer } from "./config/socketServer";
import { connectMongoDB } from "@_opportune/common"
import { errorHandler } from '@_opportune/common'

const app = express();
dotenv.config();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);
app.use(errorHandler);

connectMongoDB(process.env.MONGODB_URL!, "notification");

const PORT = process.env.PORT || 3050;

const server= http.createServer(app);

const startServer = async () => {
    try {
        initSocketServer(server);

        server.listen(PORT, () => {
            console.log(`notification-server is running on the port ${PORT}`);
        });
        // await intialiseConsumers()

    } catch (error) {
        console.log("Error in starting notification Server", error);
        process.exit(1);
    }
};

startServer();
