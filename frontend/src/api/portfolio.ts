import { portfolioData } from "@/types/IProjectPost";
import apiClient from "./axiosInstance";

export const savePortfolio = async (data: portfolioData) => {
    return await apiClient.post("/post/porfolio", data);
};

export const getPorfolios = async (userId: string):Promise<portfolioData[]> => {
    const response = await apiClient.get(`/post/portfolios/${userId}`);
    return response.data ;
};

export const getReviews = async (userId: string):Promise<any[]> => {
    const response = await apiClient.get(`/contract/reviews/${userId}`);
    return response.data ;
};