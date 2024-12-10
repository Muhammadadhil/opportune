
import apiClient from "./axiosInstance";
import {IOffer} from "../types/IOffer";


export const sendOffer = async (data: IOffer) => {
    return await apiClient.post(`/post/job/offer`, data);
};

export const getOffers = async (id: string, userType: string) => {
    return await apiClient.get(`/contract/${userType}/offers`, { params: { id } });
};

export const acceptOffer = async (offerId: string,status:string) => {
    return await apiClient.patch(`/contract/job/offer/`,{offerId,status});
};
