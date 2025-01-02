import { z } from "zod";

export const completeProfileSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Maximum 100 characters allowed" }),
    skills: z.array(z.string()).min(1, { message: "At least one skill is required" }).max(10, { message: "No more than 10 skills" }),
    accounts: z.object({
        linkedin: z.string().url({ message: "Must be a valid URL" }).optional(),
        github: z.string().url({ message: "Must be a valid URL" }).optional(),
    }),
    image: z
        .instanceof(File)
        .refine((file) => ["image/jpeg", "image/png"].includes(file.type), { message: "File must be a valid image (jpg or png)" })
        .optional(),
});
    
export type CompleteProfileForm = z.infer<typeof completeProfileSchema>;
