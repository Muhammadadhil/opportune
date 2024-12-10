import { getAccessToken } from "../../services/authService";

const requestInterceptor = (config) => {
    try {
        
        const token = getAccessToken();
        if (token) {
            config.headers["authorization"] = `Bearer ${token}`;
        }
        return config;

    } catch (error) {
        return Promise.reject(error);
    }
};

export default requestInterceptor;
