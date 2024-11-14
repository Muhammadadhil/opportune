import apiClient from "./axiosInstance";

export const saveProjectPost = async (formData) => {
    return await apiClient.post("/post/postaGig", formData, { headers: { "Content-Type": "multipart/form-data" } });
};

export const editGigPost = async (gigData) => {
    return await apiClient.post("/post/editGig", gigData);
};

export const fetchGigs = async (fId?: string) => {
    console.log('fetchgigs id:',fId);
    if (fId) return await apiClient.get(`/post/gigs/${fId}`);

    return await apiClient.get(`/post/gigs`);
};

