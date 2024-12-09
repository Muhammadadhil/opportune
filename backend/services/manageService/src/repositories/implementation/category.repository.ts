import { ICategory, ICategoryData, ISubCategory } from "../../interfaces/ICategory";
import { ICategoryRepository } from "../interface/ICategoryRepository";
import { BaseRepository } from "./base.repository";
import Category from "../../schema/category.schema";

// interface subCategory{
//     category:string,
//     name:string
// }

export class categoryRepository {

    async findCategories():Promise<ICategory[] | null>{
        return await Category.find({});
    }
    
    async findCategory(name: string): Promise<ICategory | null> {
        return await Category.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    }

    async createCategory(category: ICategoryData): Promise<ICategory> {
        const newCategory = new Category(category);
        return await newCategory.save();
    }

    async addSubCategory(subCategory: ISubCategory) {
        
        return await Category.findOneAndUpdate({ name: subCategory.category }, { $push: { subCategory } }, { new: true, upsert: false });
    }
}
