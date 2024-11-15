import { z } from "zod";

const jobPoststepTwoSchema = z.object({
    description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(1000, { message: "Description can't exceed 1000 characters" }),
    // budget: z.string().min(0, { message: "Budget cannot be negative" }).max(1000000, { message: "Budget can't exceed 100000" }),
    budget: z.number().min(0, { message: "Budget cannot be negative" }).max(999999, { message: "Budget can't exceed 999999" }),
    searchTags: z
        .array(z.string().min(1, { message: "Tag must be at least 1 character" }))
        .min(1, { message: "Please add at least one keyword." })
        .max(10, { message: "You can add up to 10 keywords" }),
});

export default jobPoststepTwoSchema;
