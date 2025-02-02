"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return {
        userId: {
            in: ["body"],
            isMongoId: {
                errorMessage: "Invalid user ID format",
            },
            notEmpty: {
                errorMessage: "userId is required",
            },
        },
        "data.freelancerId": {
            in: ["body"],
            isMongoId: {
                errorMessage: "Invalid freelancer ID format",
            },
            notEmpty: {
                errorMessage: "freelancerId is required",
            },
        },
        "data.title": {
            in: ["body"],
            isString: {
                errorMessage: "Title must be a string",
            },
            notEmpty: {
                errorMessage: "Title is required",
            },
        },
        "data.description": {
            in: ["body"],
            isString: {
                errorMessage: "Description must be a string",
            },
            notEmpty: {
                errorMessage: "Description is required",
            },
        },
        "data.price": {
            in: ["body"],
            isFloat: {
                options: { gt: 0 },
                errorMessage: "Price must be a positive number",
            },
            notEmpty: {
                errorMessage: "Price is required",
            },
        },
        "data.category": {
            in: ["body"],
            isString: {
                errorMessage: "Category must be a string",
            },
            notEmpty: {
                errorMessage: "Category is required",
            },
        },
        "data.subCategory": {
            in: ["body"],
            isString: {
                errorMessage: "Sub-category must be a string",
            },
            notEmpty: {
                errorMessage: "Sub-category is required",
            },
        },
        "data.deliveryTime": {
            in: ["body"],
            isISO8601: {
                errorMessage: "Delivery time must be a valid date",
            },
            toDate: true,
            notEmpty: {
                errorMessage: "Delivery time is required",
            },
        },
        "data.searchTags": {
            in: ["body"],
            isArray: {
                errorMessage: "Search tags must be an array",
            },
            notEmpty: {
                errorMessage: "Search tags are required",
            },
        },
        "data.isActive": {
            in: ["body"],
            optional: true,
            isBoolean: {
                errorMessage: "isActive must be a boolean",
            },
            toBoolean: true,
        },
    };
};
