import { z } from "zod";

// Define the schema for DescriptionData
 const DescriptionDataSchema = z.object({
     images: z.array(z.instanceof(File).or(z.string())).length(3, "Three image files are required").nonempty("At least one image file is required"),
     deliveryTime: z.string().nonempty("Delivery time is required"),
     description: z.string().nonempty("Description is required").min(10, "Description must be at least 10 characters long"),
     price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
     requirements: z.array(z.string()).optional(),
 });

// Type inference from the schema
export type DescriptionData = z.infer<typeof DescriptionDataSchema>;

export default DescriptionDataSchema ;
