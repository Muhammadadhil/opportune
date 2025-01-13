import { z } from "zod";

const jobPoststepOneSchema = z.object({
    jobTitle: z.string().min(5, "Job Title must be at least 5 characters long"),
    category: z.string().nonempty("Category is required"),
    subCategory: z.string().nonempty("Sub Category is required"),
    skillsRequired: z.array(z.string()).min(1, "Keywords is required").max(10, "You can add a maximum of 10 keywords"),
});

export default jobPoststepOneSchema;
