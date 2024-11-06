import express from "express";

import connectDB from "./config/db/connect";
import router from './routes/adminRoutes';
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
dotenv.config();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(morgan('dev'));

app.use("/", router);

app.use(errorHandler);


connectDB();    

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`manageService server is running on the port ${PORT}`);
});
