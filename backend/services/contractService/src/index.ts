import express from "express";
import connectDB from "./config/db/connect";
import router from "./routes/router";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import { ApplicationSerivce } from "./services/implementation/Application.services";
// import { ContractService } from "./services/implementation/contract.services";
// import { OfferService } from "./services/implementation/offer.services";
import { intialiseConsumers } from "./config/container";


const app = express();
dotenv.config();

const applicationSerivce = new ApplicationSerivce();
// const contractService = new ContractService();
// const offerService = new OfferService();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 3030;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`contract-server is running on the port ${PORT}`);
        });

        await intialiseConsumers()
        applicationSerivce.initialize();
        // contractService.initialize();
        // offerService.initialize();
    } catch (error) {
        console.log('Error in starting Server',error);
        process.exit(1);
    }
};

startServer();
