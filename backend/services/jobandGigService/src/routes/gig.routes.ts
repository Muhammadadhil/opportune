import { Router } from "express";
import { GigController } from "../controllers/gig.controller";
import { gigValidationSchema } from "../validators/gigValidator";
import validateEntry from "../middleware/validateEntry";
import { checkSchema } from "express-validator";
import editGigValidator from "../validators/editGigValidator";
import { deleteGigValidator } from "../validators/deleteGigvalidator";

const router = Router();
const gigController = new GigController();

router.post("/postaGig", gigValidationSchema, validateEntry,gigController.postAGig);
router.post("/editGig", checkSchema(editGigValidator()),validateEntry, gigController.editGig);
router.delete("/deleteGig/:id", deleteGigValidator, gigController.changeStatus);

export default router;
