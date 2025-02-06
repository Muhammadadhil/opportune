import apiClient from "./axiosInstance";

export const fetchDownloadUrl = async (fileName: string) => {
    const response = await apiClient.get(`/contract/download/generate-presigned-url/${fileName}`);
    return response.data;
}

export const fetchSkills = async (searchKey:string) => {
    const response = await apiClient.get(`/post/skills?searchKey=${searchKey}`);
    return response.data;
};