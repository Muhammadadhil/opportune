import { Router } from "express";
import { GigController } from "../controllers/gig.controller";
import { gigValidationSchema } from "../validators/gigValidator";
import validateEntry from "../middleware/validateEntry";
import { checkSchema } from "express-validator";
import editGigValidator from "../validators/editGigValidator";
import { deleteGigValidator } from "../validators/deleteGigvalidator";
import upload from "../utils/multerConfig";

const router = Router();
const gigController = new GigController();

router.post("/postaGig", upload.array("images", 3), gigController.postAGig);
router.post("/editGig", checkSchema(editGigValidator()), validateEntry,gigController.editGig);
router.delete("/deleteGig/:id", deleteGigValidator, gigController.changeStatus);

router.get('/getGigs/:id',gigController.getGigs);

export default router;
