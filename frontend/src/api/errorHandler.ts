import axios, { AxiosError, AxiosResponse } from "axios";

// Interface to match backend error structure
interface ErrorResponse {
    status: string;
    message: string;
}

/**
 * Custom Axios error handler that properly extracts error messages
 */
export const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;

        // Better error response data extraction
        if (axiosError.response?.data) {
            const errorData = axiosError.response.data;

            // Check if the response matches your backend error format
            if (typeof errorData === "object" && "message" in errorData) {
                return errorData.message;
            }
        }

        // Handle different error scenarios based on status codes
        switch (axiosError.response?.status) {
            case 400:
                return "Invalid request data";
            case 401:
                return "You are not authenticated. Please login";
            case 403:
                return "You do not have permission to perform this action";
            case 404:
                return "The requested resource was not found";
            case 422:
                return "The provided data is invalid";
            case 500:
                return "Server error occurred. Please try again later";
            default:
                return axiosError.message || "An error occurred while processing your request";
        }
    }

    // For non-Axios errors
    if (error instanceof Error) {
        return error.message;
    }

    return "An unexpected error occurred";
};
