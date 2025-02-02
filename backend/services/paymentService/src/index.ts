import express from "express";
import router from "./routes/route";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { intialiseConsumers } from "./config/container";
import webhookRouter from "./routes/webhook.route";
import { connectMongoDB } from "@_opportune/common"
import { errorHandler } from '@_opportune/common'

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

app.use("/webhook",express.raw({ type: 'application/json' }), webhookRouter);

app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);
app.use(errorHandler);

connectMongoDB(process.env.MONGODB_URL!, "payment");

const PORT = process.env.PORT || 3040;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`payment-server is running on the port ${PORT}`);
        });
        // await intialiseConsumers()

    } catch (error) {
        console.log('Error in starting payment Server',error);
        process.exit(1);
    }
};

startServer();
