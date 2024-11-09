import apiClient from "./apiClient/axios";
import IClientData from "../types/IClientData";
import { JobData } from "@/types/IProjectPost";

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

export const logout = async () => {
    return await apiClient.patch("/user/logout");
};

export const saveClientDetails = async (clientData: IClientData) => {
    return await apiClient.post("/user/save-client-details", {
        clientData,
    });
};

// freelancer
export const completeProfle = async (formData) => {
    return await apiClient.post("/user/complete-profile", formData, { headers: { "Content-Type": "multipart/form-data" } });
};

export const getProfileData = async (userId: string) => {
    return await apiClient.post("/user/freelancer-profile", { userId });
};

export const getClientProfileData = async (userId: string) => {
    return await apiClient.post("/user/client-profile", { userId });
};

// gigs
export const saveProjectPost = async (formData) => {
    return await apiClient.post("/post/postaGig", formData, { headers: { "Content-Type": "multipart/form-data" } });
};

export const editGigPost = async (gigData) => {
    return await apiClient.post("/post/editGig", gigData);
};

export const fetchGigs = async (fId: string) => {
    return await apiClient.get(`/post/getGigs/${fId}`);
};

export const fetchAllGigs = async () => {
    return await apiClient.get(`/post/getAllGigs`);
};

// jobs
export const saveJobPost = async (data: JobData) => {
    return await apiClient.post("/post/job", data);
};

export const getJobs = async (CId: string) => {
    console.log('cid:',CId)
    return await apiClient.get(`/post/jobs/${CId}`);
};

export const fetchAllJobs = async () => {
    return await apiClient.get(`/post/jobs`);
};
