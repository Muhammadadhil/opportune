import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();
const categoryController = new CategoryController();


router.post("/add-category", categoryController.addCategory);

export default router;
