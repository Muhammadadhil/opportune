import { Router } from "express";

import { offerController } from "../config/container";
import { contractController } from "../config/container";
import { applicationController } from "../config/container";
import { authenticate } from "../middleware/authenticate";
import { submissionController, reviewController } from "../config/container";

const router = Router();

//applications
router.get("/application", applicationController.checkApplication);
router.get("/client/job/applications", authenticate(['client']), applicationController.getApplications);
router.get("/freelancer/job/applications", authenticate(['freelancer']), applicationController.getFreelancerApplications);
router.get("/applications/details/:jobId/:freelancerId", authenticate(['client','freelancer']), applicationController.getApplicationDetails);

//contracts
router.get("/freelancer/contracts", authenticate(['freelancer']), contractController.getFreelancerContracts);
router.get("/client/contracts", authenticate(['client']), contractController.getClientContracts);

//offers
router.get("/client/offers", authenticate(['client']), offerController.clietOffers);
router.get("/freelancer/offers", authenticate(['freelancer']), offerController.freelancerOffers);

router.patch("/job/offer", authenticate(["freelancer"]), offerController.updateOffer);


//submit work
router.post("/submit-work", authenticate(['freelancer']), submissionController.submitWork);
router.post("/generate-presigned-url", authenticate(["freelancer"]), submissionController.generateUploadPresignedUrl);
router.get("/download/generate-presigned-url/:fileKey", authenticate(["freelancer","client"]), submissionController.generateDownloadPresignedUrl);

router.get("/submission/:contractId/:milestoneId", authenticate(["client","freelancer"]), submissionController.getSubmission);

router.patch("/submission/accept", authenticate(["client"]), submissionController.acceptSubmission);

//submit review
router.post("/review/submit", authenticate(['client', 'freelancer']), reviewController.submitReview);
router.get("/reviews/:userId", authenticate(['client', 'freelancer']), reviewController.getReviews);

export default router;
