import { Router } from "express";
import { JobController } from "../controllers/job.controller";

const router = Router();
const jobController = new JobController();

router.post("/postAJob", jobController.postJob);


export default router;
