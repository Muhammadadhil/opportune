import axios from "axios";

export const refreshToken = async (): Promise<string> => {
    try {
        const response = await axios.get(import.meta.env.VITE_SERVER_API + "/refresh-token");
        console.log('refresh token api:',import.meta.env.VITE_SERVER_API + "/refresh-token");
        return response.data.accessToken;

    } catch (error) {
        console.error("Failed to refresh token", error);
        throw error;
    }
};
