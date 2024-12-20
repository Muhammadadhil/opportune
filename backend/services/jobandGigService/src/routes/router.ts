import { Router } from "express";
import  applicationSchema  from "../validators/applicationValidator";
import editGigValidator from "../validators/editGigValidator";
// import { deleteGigValidator } from "../validators/deleteGigvalidator";
import upload from "../utils/multerConfig";
import { DataValidation } from '@_opportune/common'
import { checkSchema } from "express-validator";
import container from "../config/inversify";
import { TYPES } from "../types/types";
import { IJobController } from "../controllers/interface/IJobController";
import { IGigController } from "../controllers/interface/IGigController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

const jobController = container.get<IJobController>(TYPES.IJobController);
const gigController = container.get<IGigController>(TYPES.IGigController);

router.get("/gigs/:id", gigController.getGigs);
router.get("/gigs", gigController.getAllGigs);
router.patch("/gig/:id",gigController.changeStatus);
router.post("/postaGig", upload.array("images", 3), gigController.postAGig);
router.post("/editGig", upload.array("images", 3),checkSchema(editGigValidator()), DataValidation,gigController.editGig);

// jobs
router.get("/jobs", authenticate(["client", "freelancer"]), jobController.getJobs);
router.get("/jobs/:id",authenticate(['client']), jobController.getJobsByClient);
router.post("/job", authenticate(['client']),jobController.postJob);

router.patch("/job", authenticate(["client"]), jobController.editJob);
router.patch("/job/:id",authenticate(['client']), jobController.removeJob);

router.post("/job/application", authenticate(['freelancer']),checkSchema(applicationSchema()), DataValidation, jobController.applyForJob);
router.post("/job/approve",authenticate(['client']),jobController.approveApplication);

router.get("/batch/jobs", jobController.getJobDetails);
router.get('/job/:id', authenticate(['client','freelancer']),jobController.getJobDetail);

//offer 
router.post("/job/offer", authenticate(["client"]), jobController.sendOffer);

export default router;
