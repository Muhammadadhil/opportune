import { Router } from "express";
import multer from "multer";

import { offerController } from "../config/container";
import { contractController } from "../config/container";
import { applicationController } from "../config/container";
import { authenticate } from "../middleware/authenticate";
import { submissionController, reviewController } from "../config/container";

const router = Router();
const upload = multer();

//applications
router.get("/application", applicationController.checkApplication);
router.get("/client/job/applications", authenticate(['client']), applicationController.getApplications);
router.get("/freelancer/job/applications", authenticate(['freelancer']), applicationController.getFreelancerApplications);

//contracts
router.get("/freelancer/contracts", authenticate(['freelancer']), contractController.getFreelancerContracts);
router.get("/client/contracts", authenticate(['client']), contractController.getClientContracts);

//offers
router.get("/client/offers", authenticate(['client']), offerController.clietOffers);
router.get("/freelancer/offers", authenticate(['freelancer']), offerController.freelancerOffers);

router.patch("/job/offer", authenticate(["freelancer"]), offerController.updateOffer);


//submit work
router.post("/submit-work", authenticate(['freelancer']), submissionController.submitWork);
router.post("/generate-presigned-url", authenticate(['freelancer']), submissionController.generatePresignedUrl);

router.get("/submission/:contractId/:milestoneId", authenticate(["client","freelancer"]), submissionController.getSubmission);

router.patch("/submission/accept", authenticate(["client"]), submissionController.acceptSubmission);

//submit review
router.post("/review/submit", authenticate(['client', 'freelancer']), reviewController.submitReview);

export default router;
