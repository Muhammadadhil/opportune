import apiClient from "./axiosInstance";

export const editGigPost = async (gigData) => {
    return await apiClient.post("/post/editGig", gigData);
};

export const fetchGigs = async (fId?: string) => {
    console.log('fetchgigs id:',fId);
    if (fId) return await apiClient.get(`/post/gigs/${fId}`);

    return await apiClient.get(`/post/gigs`);
};

export const removeGig = async (gigId:string) => {
    return await apiClient.patch(`/post/gig/${gigId}`);
};

export const savePortfolio = async (formData) => {
    return await apiClient.post("/post/postaGig", formData, { headers: { "Content-Type": "multipart/form-data" } });
};