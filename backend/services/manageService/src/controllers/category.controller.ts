import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../utils/HTTPError";
import { categoryService } from "../services/implementation/category.services";

class CategoryController {

    private categoryService

    constructor() {
        this.categoryService = new categoryService();
    }

    async addCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { category, subCategory } = req.body;
            console.log('Add Category::: category:',category)
            
            await this.categoryService.addCategory(category,subCategory);
            // if (!category) {
            //     throw new HTTPError("Category name is required", 400);
            // }

            res.status(201).json({ message: "Category added successfully" });
        } catch (error) {
            next(error);
        }
    }
}

export const categoryController = new CategoryController();
