import express from "express";
import router from './routes/userRouter';
import connectDB from "./config/connectDB";
import dotenv from 'dotenv';
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}))
app.use('/api/user/',router)

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
});
