import { Router } from "express";
import applicationSchema from "../validators/applicationValidator";
import editGigValidator from "../validators/editGigValidator";
// import { deleteGigValidator } from "../validators/deleteGigvalidator";
import upload from "../utils/multerConfig";
import { DataValidation } from "@_opportune/common";
import { checkSchema } from "express-validator";
import container from "../config/inversify";
import { TYPES } from "../types/types";
import { IJobController } from "../controllers/interface/IJobController";
import { IGigController } from "../controllers/interface/IGigController";
import { authenticate } from "../middleware/authenticate";
import { IPortfolioController } from "../controllers/interface/IPortfolioController";
import { ISkillController } from "../controllers/interface/ISkillController";
import { ISkillRepository } from "../repositories/interfaces/ISkillRepository";

const router = Router();

const jobController = container.get<IJobController>(TYPES.IJobController);
const gigController = container.get<IGigController>(TYPES.IGigController);
const portfolioController = container.get<IPortfolioController>(TYPES.IPortFolioController);
const skillController = container.get<ISkillController>(TYPES.ISkillController);

router.get("/gigs/:id", gigController.getGigs);
router.get("/gigs", gigController.getAllGigs);
router.patch("/gig/:id", gigController.changeStatus);
router.post("/postaGig", upload.array("images", 3), gigController.postAGig);
router.post("/editGig", upload.array("images", 3), checkSchema(editGigValidator()), DataValidation, gigController.editGig);

// jobs
router.get("/jobs", jobController.getJobs);
router.get("/jobs/:id", authenticate(["client"]), jobController.getJobsByClient);
router.post("/job", authenticate(["client"]), jobController.postJob);
router.post("/job/status/change/:id/:status", authenticate(["admin"]), jobController.changeJobStatus);

router.patch("/job", authenticate(["client"]), jobController.editJob);
router.patch("/job/:id", authenticate(["client"]), jobController.removeJob);

router.post("/job/application", authenticate(["freelancer"]), checkSchema(applicationSchema()), DataValidation, jobController.applyForJob);
router.post("/job/approve", authenticate(["client"]), jobController.approveApplication);

router.get("/batch/jobs", jobController.getJobDetails);
router.get("/job/:id", authenticate(["client", "freelancer"]), jobController.getJobDetail);

//offer
router.post("/job/offer", authenticate(["client"]), jobController.sendOffer);

//portfolio
router.post("/porfolio", authenticate(["freelancer"]), portfolioController.postPortfolio);
router.get("/portfolios/:userId", authenticate(["freelancer", "client"]), portfolioController.getPortfolios);

router.get("/skills", skillController.getSkills);
router.get("/createsample/:skill", skillController.createSkill);

export default router;
