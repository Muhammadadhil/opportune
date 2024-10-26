import { Router } from "express";
import { GigController } from "../controllers/gig.controller";

const router = Router();
const gigController = new GigController();


export default router;
