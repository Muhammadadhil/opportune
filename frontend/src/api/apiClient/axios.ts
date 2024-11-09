import axios from "axios";
import { getAccessToken, setAccessToken } from "../../services/authService";
import { refreshToken } from "../auth";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {

        const token = getAccessToken();
        if (token) {
            config.headers["authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!Going to get the new access token with refresh token !!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                const newAccessToken = await refreshToken();
                setAccessToken(newAccessToken);
                originalRequest.headers["Authorisation"] = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (error) {
                console.error("Refresh token failed", error);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
