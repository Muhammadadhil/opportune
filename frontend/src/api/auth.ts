import axios from "axios";
import apiClient from "./axiosInstance";

export const refreshToken = async (): Promise<string> => {
    try {
        const response = await apiClient.get(import.meta.env.VITE_SERVER_API + "user/refreshToken");
        return response.data.accessToken;
    } catch (error) {
        console.error("Failed to refresh token", error);
        throw error;
    }
};

export const getCountries = () => {
    return axios.get("https://restcountries.com/v3.1/all");
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

export const verifyOtp = async (otp:string,email:string)=>{
    console.log("verify email api function : going to send req!!!");

    return await apiClient.post("/user/otp-verify", {
        otp,
        email,
    });
}

export const resendOtp = async (email:string)=>{
    console.log("verify email api function : going to send req!!!");
    return await apiClient.post("/user/otp-resend", {
        email,
    });
}