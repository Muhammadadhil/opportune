import express from "express"; 
import connectDB from "./config/db/connect";
import router from './routes/gig.routes';
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

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

connectDB();    

const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
    console.log(`jobandGig server is running on the port ${PORT}`);
});
