import express from "express";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";

import connectDB from "./config/connectDB";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}))
app.use(cookieParser());

app.use("/api/user/", userRouter);
app.use("/api/admin/", adminRouter);



connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
});
