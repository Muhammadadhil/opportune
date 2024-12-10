import apiClient from "./axiosInstance";
import { IPaymentData } from "@/types/IPaymentData";

export const getFContracts = async (fId: string) => {
    console.log("sedning request:/contract/freelancer/contracts");
    return await apiClient.get(`/contract/freelancer/contracts`, { params: { fId } });
};

export const getClientContracts = async (cId: string) => {
    return await apiClient.get(`/contract/client/contracts`, { params: { cId } });
};

export const createPaymentIntent = async (amount:number) => {
    return await apiClient.post(`/payment/create-intent`, {
        amount,
        currency: "usd",
    });
};

export const createChekcoutSession = async (data:IPaymentData) => {
    return await apiClient.post(`/payment/create/checkout-session`, { milestoneAmount:data.milestoneAmount,contractId:data.contractId,freelancerId:data.freelancerId, clientId:data.clientId,milestoneId:data.milestoneId });
};

;
