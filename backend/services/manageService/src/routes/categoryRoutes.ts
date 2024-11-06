import { Router } from "express";
import { categoryController } from "../controllers/category.controller";

const router = Router();

router.post("/add", (req, res, next) => categoryController.addCategory(req, res, next));

export default router;
