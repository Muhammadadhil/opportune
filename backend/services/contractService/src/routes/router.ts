import { Router } from "express";
import { GigController } from "../controllers/gig.controller";

const router = Router();
const gigController = new GigController();

// router.get("/gigs", gigController.getAllGigs);


export default router;
