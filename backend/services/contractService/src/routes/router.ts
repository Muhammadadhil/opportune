import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller";

const router = Router();
const applicationController = new ApplicationController();

router.get("/application", applicationController.checkApplication);


export default router;
