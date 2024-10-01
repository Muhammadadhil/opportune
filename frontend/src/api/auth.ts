import axios from "axios";
import apiClient from "./axios";

export const refreshToken = async (): Promise<string> => {
    try {
        console.log("refresh token api:", import.meta.env.VITE_SERVER_API + "user/refreshToken");
        const response = await axios.get(import.meta.env.VITE_SERVER_API + "user/refreshToken");
        return response.data.accessToken;

    } catch (error) {
        console.error("Failed to refresh token", error);
        throw error;
    }
};


export const getGoogleAuthTokens = async (code: string) => {
    return await apiClient.post("/user/auth/google", {
        code,
    });
};

export const getUserDetails = async (token: string, role?: string, authType:string='login') => {
    return await apiClient.post("/user/google-login", {
        token,
        role,
        authType,
    });
};