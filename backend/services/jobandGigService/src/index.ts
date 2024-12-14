import express from "express";
import router from "./routes/router";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectMongoDB } from '@_opportune/common'
import { errorHandler } from '@_opportune/common'

const app = express();
dotenv.config();

// const jobService = new JobService();

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

connectMongoDB(process.env.MONGODB_URL!, "jobandGigService");

const PORT = process.env.PORT || 3020;

const startServer = async () => {
    try {
        // await jobService.intialize();
        app.listen(PORT, () => {
            console.log(`jobandGig server is running on the port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
