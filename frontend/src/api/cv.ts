
import apiClient from "./axiosInstance";


export const getCV = async (userId: string) => {
    const response = await apiClient.get(`/user/cv/${userId}`);
    return response.data;
};

export const getUploadSignedUrl = async (fileName: string, fileType: string) => {
    const response = await apiClient.post("/user/cv/upload-url", { 
        fileName, 
        fileType 
    });
    return response.data;
};

export const saveCVDetails = async (userId: string, cvDetails: any) => {
    const response = await apiClient.post(`/user/cv/save-details/${userId}`, cvDetails);
    return response.data;
};

// export const getCVUrl = async (userId: string) => {
//     const response = await apiClient.get(`/user/cv/${userId}`);
//     return response.data;
// };