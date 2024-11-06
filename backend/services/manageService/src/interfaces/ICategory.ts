import { Document } from "mongoose";

export interface ISubCategory {
    name:string;
}

export interface ICategory extends Document {
    name: string;
    subCategory?: ISubCategory[];
}

export interface ICategoryData {
    name: string;
    subCategory?: ISubCategory[];
}