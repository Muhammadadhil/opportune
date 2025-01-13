import { Schema } from "express-validator";

export default (): Schema => {
    return {
        jobId: {
            in: ["body"],
            isMongoId: {
                errorMessage: "Invalid Job ID format",
            },
            notEmpty: {
                errorMessage: "jobId is required",
            },
        },
        clientId: {
            in: ["body"],
            isMongoId: {
                errorMessage: "Invalid client ID format",
            },
            notEmpty: {
                errorMessage: "clientId is required",
            },
        },
        freelancerId: {
            in: ["body"],
            isMongoId: {
                errorMessage: "Invalid freelancer ID format",
            },
            notEmpty: {
                errorMessage: "freelancerId is required",
            },
        },
    };
    
};
