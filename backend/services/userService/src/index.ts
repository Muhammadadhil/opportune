import express from "express";
import userRouter from "./routes/userRouter";

import connectDB from "./config/connectDB";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

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

app.use("/", userRouter);

connectDB();

const PORT = process.env.PORT || 3015;

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
});
