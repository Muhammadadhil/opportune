import { ICategory, ISubCategory,ICategoryData } from "../../interfaces/ICategory";
import { categoryRepository } from "../../repositories/implementation/category.repository";

export class categoryService {

    private categoryRepository;

    constructor() {
        this.categoryRepository = new categoryRepository();
    }

    async addCategory(category: string, subCategory: ISubCategory) {

        if (category && !subCategory) {

            const item: ICategoryData = {
                name: category,
                subCategory: [],
            };

            this.categoryRepository.create(item);
        }else{

        }
    }
}
