import { Router } from "express";
import multer from "multer";

import { offerController } from "../config/container";
import { contractController } from "../config/container";
import { applicationController } from "../config/container";
import { authenticate } from "../middleware/authenticate";
import { submissionController } from "../config/container";

const router = Router();
const upload = multer();

//applications
router.get("/application", applicationController.checkApplication);
router.get("/client/job/applications",authenticate(['client']), applicationController.getApplications);
router.get("/freelancer/job/applications",authenticate(['freelancer']),applicationController.getFreelancerApplications);

//contracts
router.get("/freelancer/contracts",authenticate(['freelancer']), contractController.getFreelancerContracts);
router.get("/client/contracts",authenticate(['client']), contractController.getClientContracts); 

//offers
router.get("/client/offers",authenticate(['client']), offerController.clietOffers);  
router.get("/freelancer/offers",authenticate(['freelancer']), offerController.freelancerOffers); 

router.patch("/job/offer", authenticate(["freelancer"]), offerController.updateOffer);


//submit work
router.post("/submit-work", authenticate(['freelancer']), upload.single('file'), submissionController.submitWork);

export default router;
