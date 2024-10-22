import { z } from "zod";

// Add full validation for all fields
export const UserSchema = z.object({
    githubUrl: z.string().url().includes("github.com", { message: "Invalid GitHub URL" }).optional(),
    linkedinUrl: z.string().url().optional(),
    otherUrl: z.string().url().optional(),
    title: z.string().min(5, { message: "Title must be at least 5 characters long" }).max(50, { message: "Title must be 50 characters or less" }),
    skills: z.array(z.string()).min(1, { message: "At least one skill is required" }).max(10, { message: "You can add up to 10 skills" }),
    image: z.any().refine((file) => file instanceof File, { message: "Profile image is required" }),
});
