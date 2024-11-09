import { Router } from "express";
import { GigController } from "../controllers/gig.controller";
import { gigValidationSchema } from "../validators/gigValidator";
import validateEntry from "../middleware/validateEntry";
import { checkSchema } from "express-validator";
import editGigValidator from "../validators/editGigValidator";
import { deleteGigValidator } from "../validators/deleteGigvalidator";
import upload from "../utils/multerConfig";
import { JobController } from "../controllers/job.controller";

const router = Router();
const gigController = new GigController();
const jobController = new JobController();

router.post("/postaGig", upload.array("images", 3), gigController.postAGig);
router.post("/editGig", upload.array("images", 3),gigController.editGig);
router.delete("/deleteGig/:id", deleteGigValidator, gigController.changeStatus);

router.get('/getGigs/:id',gigController.getGigs);
router.get("/getAllGigs", gigController.getAllGigs);   

// jobs
router.get('/jobs',jobController.getJobs);
router.get("/jobs/:id", jobController.getJobsByClient);
router.post("/job", jobController.postJob);


export default router;
