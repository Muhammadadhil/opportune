import apiClient from "./axiosInstance";
import IClientData from "../types/IClientData";


export const saveClientDetails = async (clientData: IClientData) => {
    return await apiClient.post("/user/clients/details", {
        clientData,
    });
};
// freelancer

export const getUploadSignedUrl= async (fileName:string,fileType:string)=>{
     const response = await apiClient.post("/user/generate-presigned-url", { fileName, fileType });
     return response.data;
}

export const completeProfle = async (data:any) => {
    return await apiClient.post("/user/freelancers/complete-profile", data);
};

export const getProfileData = async (userId: string) => {
    return await apiClient.post("/user/freelancers/profile", { userId });
};

export const getClientProfileData = async (userId?: string) => {
    return await apiClient.post("/user/clients/profile", { userId });
};

export const updateProfile = async (userId: string, formData: any) => {
    return await apiClient.patch(`/user/freelancers/profile/${userId}`, formData);
};

export const fetchUserInfo = async (userId: string,userType:'client'|'freelancer') => {
    const response = await apiClient.get(`/user/${userType}/${userId}`);
    return response.data;
}