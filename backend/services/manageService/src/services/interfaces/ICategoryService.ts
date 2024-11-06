import { ICategory } from "../../interfaces/ICategory";

export interface categoryService {
    addCategory:(category:string,subCategory:string):Promise<ICategory|null>;
}
