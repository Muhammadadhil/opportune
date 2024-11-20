import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller";

const router = Router();
const applicationController = new ApplicationController();

router.get("/application", applicationController.checkApplication);
router.get("/client/job/applications", applicationController.getApplications);


export default router;
