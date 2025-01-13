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

app.use(
    cors({
        origin: "http://localhost:5173", 
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
