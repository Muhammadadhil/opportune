import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller";

const router = Router();
const applicationController = new ApplicationController();

router.get("/application", applicationController.checkApplication);
router.get("/client/job/applications", applicationController.getApplications);
router.get("/freelancer/job/applications", applicationController.getFreelancerApplications);


export default router;
