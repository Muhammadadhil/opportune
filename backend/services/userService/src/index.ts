import express, { Request, Response } from "express";
import router from './routes/userRouter';
import connectDB from "./config/connectDB";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/user/',router)

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
});
