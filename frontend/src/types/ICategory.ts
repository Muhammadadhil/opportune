export interface ICategory {
    _id: string;
    name: string;
    subCategory: ISubCategory[];
}

export interface ISubCategory {
    _id: string;
    name: string;
}
