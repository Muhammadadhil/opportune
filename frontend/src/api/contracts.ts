import apiClient from "./axiosInstance";

export const getFContracts = async (fId: string) => {
    console.log("sedning request:/contract/freelancer/contracts");
    return await apiClient.get(`/contract/freelancer/contracts`, { params: { fId } });
};

export const getClientContracts = async (cId: string) => {
    return await apiClient.get(`/contract/client/contracts`, { params: { cId } });
};
