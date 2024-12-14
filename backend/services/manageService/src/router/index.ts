import { Router } from "express";
import adminRouter from "./routes/adminRoutes";
import categoryRouter from "./routes/categoryRoutes";

const registerRoutes = (app: Router): void => {
    app.use("/", adminRouter);
    app.use("/category", categoryRouter);
};

export default registerRoutes;
