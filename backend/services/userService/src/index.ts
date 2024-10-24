import express from "express";
import userRouter from "./routes/userRouter";

import connectDB from "./config/connectDB";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5174", credentials: true })); // Allow cookies to be sent across origins
app.use(express.json());


app.use("/user/", userRouter);

connectDB();

const PORT = process.env.PORT || 3015;

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
});
