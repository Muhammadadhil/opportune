import axios from "axios";
import { setAccessToken } from "../services/authService";
import { refreshToken } from "./auth";
import requestInterceptor from "./interceptors/requestInterceptor";
import { logout } from "./auth";
import { logoutTheUser } from "../utils/logout";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(requestInterceptor);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log('axios instance error:',error.response);

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("requesting for refresh token !!!!");

                const newAccessToken = await refreshToken();
                setAccessToken(newAccessToken);
                originalRequest.headers["Authorisation"] = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (error) {
                console.error("Refresh token failed", error);
                logoutTheUser();
                await logout();
                return Promise.reject(error);
            }

        } else if (error.response.status === 403) {
            
            console.error("Got 403 error, logging out the user!");
            logoutTheUser();
            await logout();
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default apiClient;

