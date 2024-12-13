import { Router } from "express";

import { offerController } from "../config/container";
import { contractController } from "../config/container";
import { applicationController } from "../config/container";
import { authenticate } from "../middleware/authenticate";

const router = Router();

//applications
router.get("/application", applicationController.checkApplication);
router.get("/client/job/applications", applicationController.getApplications);
router.get("/freelancer/job/applications",authenticate(['freelancer']),applicationController.getFreelancerApplications);

//contracts
router.get("/freelancer/contracts", contractController.getFreelancerContracts);
router.get("/client/contracts", contractController.getClientContracts); 

//offers
router.get("/client/offers",authenticate(['client']), offerController.clietOffers);  
router.get("/freelancer/offers",authenticate(['freelancer']), offerController.freelancerOffers); 

// accept or reject offer
router.patch("/job/offer", offerController.updateOffer);




export default router;
