import express from "express";
import userRouter from "./routes/userRouter";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectMongoDB, errorHandler } from "@_opportune/common";

const app = express();
dotenv.config();

app.use(cookieParser());

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

app.use(errorHandler);

app.use("/", userRouter);

connectMongoDB(process.env.MONGODB_URL!, "user");
const PORT = process.env.PORT || 3015;

app.listen(PORT, () => {
    console.log(`useService server is running on the port ${PORT}`);
});
