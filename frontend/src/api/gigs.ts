
import apiClient from "./axiosInstance";

export const editGigPost = async (gigData:any) => {
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
