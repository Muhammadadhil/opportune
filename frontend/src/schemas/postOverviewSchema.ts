import { z } from "zod";

export const overViewSchema = z.object({
    title: z.string().min(5, "Work Title must be at least 5 characters long"),
    category: z.string().nonempty("Category is required"),
    subCategory: z.string().nonempty("Sub Category is required"),
    searchTags: z.string(),
    keywords: z.array(z.string()).min(1, "Keywords is required").max(10, "You can add a maximum of 10 keywords"),
});

