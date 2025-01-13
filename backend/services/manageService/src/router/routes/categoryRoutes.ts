import { Router } from "express";
import { categoryController } from "../../controllers/implementation/category.controller";
import { adminAuth } from "../../middleware/authenticate";

const router = Router();

router.post("/add",adminAuth,(req, res, next) => categoryController.addCategory(req, res, next));
router.get("/getCategories", (req, res, next) => categoryController.getAllCategories(req, res, next));


export default router;
