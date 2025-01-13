import { param } from "express-validator";

export const deleteGigValidator = [param("id").isMongoId().withMessage("Invalid ID format. Must be a valid MongoDB ObjectId")];