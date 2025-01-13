import { z } from "zod";

export const signUpvalidationSchema = z
    .object({
        firstname: z.string().min(1, { message: "Firstname is required" }),
        lastname: z.string().min(1, { message: "Lastname is required" }),
        email: z.string().min(1, { message: "Email is required" }).email({
            message: "Must be a valid email",
        }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
        country: z.string().min(1, { message: "Country is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords don't match",
    });
