import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces/ICategory";

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    subCategory: [
        {
            name: {
                type: String,
                required: true,
            },
        },
    ],
});

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
