import { ISubCategory, ICategoryData } from "../../interfaces/ICategory";
import { categoryRepository } from "../../repositories/implementation/category.repository";
import { CustomError } from "@_opportune/common";

export class categoryService {
    private categoryRepository;

    constructor() {
        this.categoryRepository = new categoryRepository();
    }

    async addCategory(category: string, subCategory: ISubCategory) {
        if (category && !subCategory) {
            console.log("category:", category);

            const categoryExist = await this.categoryRepository.findCategory(category);

            if (categoryExist) {
                throw new CustomError("category already exists", 400); 
            }
            const item: ICategoryData = {
                name: category,
                subCategory: [],
            };
            await this.categoryRepository.createCategory(item);
        } else if (subCategory) {
            await this.categoryRepository.addSubCategory(subCategory);
        }
    }

    async getCategories() {
        return await this.categoryRepository.findCategories();
    }
}
