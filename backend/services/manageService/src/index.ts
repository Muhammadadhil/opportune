import "reflect-metadata"; 
import express from "express";
import { setupMiddlewares } from "./middleware/middlewares";
import registerRoutes from "./router/index";
import { connectMongoDB } from "@_opportune/common";
import { intialiseConsumers } from "./events/rabbitmq/initialiseConsumers";
import { errorHandler } from "@_opportune/common";

const app = express();

setupMiddlewares(app);
registerRoutes(app);

app.use(errorHandler);

const startServer = async () => {
    try {
        const mongoDBUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/manage"; 
        const port = process.env.PORT || 3010; 

        await connectMongoDB(mongoDBUrl, "manage");

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        await intialiseConsumers();
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
