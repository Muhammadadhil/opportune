import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller";
import { ContractController } from "../controllers/contract.controller";

const router = Router();
const applicationController = new ApplicationController();
const contractController = new ContractController();

router.get("/application", applicationController.checkApplication);
router.get("/client/job/applications", applicationController.getApplications);
router.get("/freelancer/job/applications", applicationController.getFreelancerApplications);

//contracts
router.get("/freelancer/contracts", contractController.getFreelancerContracts);

router.get("/client/hires", contractController.getJobContracts);  //want to change this;


export default router;
