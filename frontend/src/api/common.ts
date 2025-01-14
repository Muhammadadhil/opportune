import apiClient from "./axiosInstance";

export const fetchDownloadUrl = async (fileName: string) => {
    const response = await apiClient.get(`/contract/download/generate-presigned-url/${fileName}`);
    return response.data;
}