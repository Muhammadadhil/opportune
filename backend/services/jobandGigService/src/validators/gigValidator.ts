import { checkSchema } from "express-validator";

export const gigValidationSchema = checkSchema({
    freelancerId: {
        in: ["body"],
        isMongoId: {
            errorMessage: "Invalid freelancer ID format",
        },
        notEmpty: {
            errorMessage: "freelancerId is required",
        },
    },
    title: {
        in: ["body"],
        isString: {
            errorMessage: "Title must be a string",
        },
        notEmpty: {
            errorMessage: "Title is required",
        },
        escape: true, // Sanitize the title field
    },
    description: {
        in: ["body"],
        isString: {
            errorMessage: "Description must be a string",
        },
        notEmpty: {
            errorMessage: "Description is required",
        },
        escape: true, 
    },
    price: {
        in: ["body"],
        isFloat: {
            options: { gt: 0 },
            errorMessage: "Price must be a positive number",
        },
        notEmpty: {
            errorMessage: "Price is required",
        },
    },
    category: {
        in: ["body"],
        isString: {
            errorMessage: "Category must be a string",
        },
        notEmpty: {
            errorMessage: "Category is required",
        },
        escape: true, 
    },
    subCategory: {
        in: ["body"],
        isString: {
            errorMessage: "Sub-category must be a string",
        },
        notEmpty: {
            errorMessage: "Sub-category is required",
        },
        escape: true, 
    },
    deliveryTime: {
        in: ["body"],
        isISO8601: {
            errorMessage: "Delivery time must be a valid date",
        },
        toDate: true,
        notEmpty: {
            errorMessage: "Delivery time is required",
        },
    },
    searchTags: {
        in: ["body"],
        isArray: {
            errorMessage: "Search tags must be an array",
        },
        notEmpty: {
            errorMessage: "Search tags are required",
        },
        escape: true, 
    },
    isActive: {
        in: ["body"],
        optional: true,
        isBoolean: {
            errorMessage: "isActive must be a boolean",
        },
        toBoolean: true,
    },
});
