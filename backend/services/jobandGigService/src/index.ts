import express from "express";
import connectDB from "./config/db/connect";
import router from "./routes/router";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
// import { JobService } from "./services/implementation/job.services";

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

connectDB();

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
