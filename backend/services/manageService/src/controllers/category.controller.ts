import { Request, Response, NextFunction } from "express";
import { categoryService } from "../services/implementation/category.services";

class CategoryController {

    private categoryService

    constructor() {
        this.categoryService = new categoryService();
    }

    async getAllCategories(req: Request, res: Response, next: NextFunction){
        try {
            console.log('here in category geting')
            const categories=await this.categoryService.getCategories();
            res.status(200).json(categories);

        } catch (error) {
            console.log("error in getting:", error);
            next(error);
        }
    }

    async addCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { category, subCategory } = req.body;
            await this.categoryService.addCategory(category,subCategory);
            res.status(201).json({ message: "Category added successfully" });
        } catch (error) {
            next(error);
        }
    }
}

export const categoryController = new CategoryController();
