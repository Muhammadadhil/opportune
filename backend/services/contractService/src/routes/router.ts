import { Router } from "express";

import { offerController } from "../config/container";
import { contractController } from "../config/container";
import { applicationController } from "../config/container";

const router = Router();

//applications
router.get("/application", applicationController.checkApplication);
router.get("/client/job/applications", applicationController.getApplications);
router.get("/freelancer/job/applications", applicationController.getFreelancerApplications);

//contracts
router.get("/freelancer/contracts", contractController.getFreelancerContracts);
router.get("/client/contracts", contractController.getClientContracts); 

//offers
router.get("/client/offers", offerController.clietOffers);  
router.get("/freelancer/offers", offerController.freelancerOffers); 

// accept or reject offer
router.patch("/job/offer", offerController.updateOffer);




export default router;
