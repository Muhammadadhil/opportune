import express from "express";
import router from "./routes/router";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { intialiseConsumers } from "./config/container";
import { connectMongoDB } from "@_opportune/common"
import { errorHandler } from '@_opportune/common'

const app = express();
dotenv.config();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);
app.use(errorHandler);

connectMongoDB(process.env.MONGODB_URL!,'contract');

const PORT = process.env.PORT || 3030;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`contract-server is running on the port ${PORT}`);
        });
        await intialiseConsumers()

    } catch (error) {
        console.log('Error in starting Server',error);
        process.exit(1);
    }
};

startServer();
