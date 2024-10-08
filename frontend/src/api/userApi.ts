import apiClient from "./apiClient/axios";
import IClientData from '../types/IClientData';

interface FormData {
    email: string;
    password: string;
}

interface SignUpFormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    country: string;
    role: string;
}
 

export const signUp = async (formData: SignUpFormData) => {
    return await apiClient.post("/user/register", {
        formData,
    });
};

export const signIn = async (formData: FormData) => {
    return await apiClient.post("/user/login", { email: formData.email, password: formData.password });
};


export const logout=async()=>{
    return await apiClient.patch('/user/logout');
}

export const saveClientDetails = async (clientData: IClientData) => {
    return await apiClient.post("/user/save-client-details", {
        clientData
    });
};

