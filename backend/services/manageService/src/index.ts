import express from "express";
import router from './routes/adminRoutes';
import categoryRouter from './routes/categoryRoutes';
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from '@_opportune/common'
import { connectMongoDB } from '@_opportune/common'


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
app.use("/category", categoryRouter);


app.use(errorHandler);

connectMongoDB(process.env.MONGODB_URL!, "manage");    

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`manageService server is running on the port ${PORT}`);
});
