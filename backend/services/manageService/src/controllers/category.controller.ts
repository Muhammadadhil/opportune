import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../utils/HTTPError";

class CategoryController {
    // private categoryService: n

    constructor() {}

    async addCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryName = req.body.name;
            if (!categoryName) {
                throw new HTTPError("Category name is required", 400);
            }

            res.status(201).json({ message: "Category added successfully" });
        } catch (error) {
            next(error);
        }
    }
}

export const categoryController = new CategoryController();
