import { Router } from "express";
import { GigController } from "../controllers/gig.controller";

const router = Router();
const gigController = new GigController();

router.post('/postaGig',gigController.postAGig);
router.post('/editGig',gigController.editGig);
router.delete("/deleteGig/:id", gigController.changeStatus);




export default router;
