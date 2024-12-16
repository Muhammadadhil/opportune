import apiClient from "./axiosInstance";
import IClientData from "../types/IClientData";
import {IFormData} from "../types/IAuth";


export const saveClientDetails = async (clientData: IClientData) => {
    return await apiClient.post("/user/clients/details", {
        clientData,
    });
};
// freelancer
export const completeProfle = async (formData:IFormData) => {
    return await apiClient.post("/user/freelancers/complete-profile", formData, { headers: { "Content-Type": "multipart/form-data" } });
};

export const getProfileData = async (userId: string) => {
    return await apiClient.post("/user/freelancers/profile", { userId });
};

export const getClientProfileData = async (userId: string) => {
    return await apiClient.post("/user/clients/profile", { userId });
};

export const updateProfile = async (userId: string, formData: any) => {
    return await apiClient.patch(`/user/freelancers/profile/${userId}`, formData);
};

