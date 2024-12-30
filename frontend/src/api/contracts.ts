import { ISubmission } from "@/types/ISubmisssion";
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

export const getUploadUrl = async (fileName: string, fileType: string) => {
    const response = await apiClient.post(`/contract/generate-presigned-url`, { fileName, fileType });
    return response.data;
};


// by freelancer
export const submitWork = async (data: ISubmission) => {
    return await apiClient.post(`/contract/submit-work`, data);
};


// for client
export const fetchSubmission = async (contractId: string, milestoneId: string) => {
    const response = await apiClient.get(`/contract/submission/${contractId}/${milestoneId}`);
    console.log('respose submisssion:',response)
    return response.data;
};

// by client
export const acceptSubmission = async (submissionId:string) => {
    return await apiClient.patch(`/contract/submission/accept`, {submissionId});
};

export const submitReview = async (contractId: string, rating: number, comment: string, reviewerId:string) => {
    return await apiClient.post(`/contract/review/submit`, { contractId, rating, comment, reviewerId });
};