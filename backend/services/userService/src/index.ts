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

const allowedOrigins = [
    "http://localhost:5173", // For local development
    "https://opportune-three.vercel.app/", // Replace with your actual Vercel domain
];

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

console.log('process.env.MONGODB_URL: ', process.env.MONGODB_URL);
console.log('process.env.RABBITMQ_URL: ', process.env.RABBITMQ_URL);
console.log('process.env.PORT: ', process.env.PORT);
console.log("process.env.JWT_ACCESSTOKEN_SECRET: ", process.env.JWT_ACCESSTOKEN_SECRET);
console.log("process.env.NODEMAILER_USER: ", process.env.NODEMAILER_USER);

const PORT = process.env.PORT || 3015;

app.listen(PORT, () => {
    console.log(`useService server is running on the port ${PORT}`);
});
