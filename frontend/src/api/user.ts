import apiClient from "./axiosInstance";
import IClientData from "../types/IClientData";
import { userInfo } from "@/types/IUserState";


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
    const response = await apiClient.post("/user/freelancers/profile", { userId });
    return response.data;
};

export const getClientProfileData = async (userId?: string) => {
    return await apiClient.post("/user/clients/profile", { userId });
};

export const updateProfile = async (userId: string, formData: any) => {
    const response = await apiClient.patch(`/user/profile/${userId}`, formData);
    return response.data;
};

//fetch only the user details
export const getUserDetails = async (userId: string): Promise<userInfo | null> => {
    const response = await apiClient.get(`/user/details/${userId}`);
    return response.data;
};

export const fetchFreelancers = async () => {
    const response = await apiClient.get("/user/freelancers/list");
    return response.data;
}


// fetch all the details
export const getUserById = async (userId?: string) => {
    if(userId){
        const response = await apiClient.get(`/user/${userId}`);
        return response.data;
    }
    
}