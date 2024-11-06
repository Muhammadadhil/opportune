import { ICategory } from "../../interfaces/ICategory";
import { ICategoryRepository } from "../interface/ICategoryRepository";
import { BaseRepository } from "./base.repository";
import Category from "../../schema/category.schema";


export class categoryRepository extends BaseRepository<ICategory> implements ICategoryRepository{
    constructor() {
        super(Category);
    }

}