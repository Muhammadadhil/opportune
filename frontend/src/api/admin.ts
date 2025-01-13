import apiClient from "./axiosInstance";
import { IUser } from '@/types/IUser'

type subCategory = {
    category: string;
    name: string;
};

export const loginAdmin = async (email: string, password: string) => {
    return await apiClient.post("manage/login", {
        email,
        password,
    });
};

export const logoutAdmin = async () => {
    return await apiClient.patch("manage/logout");
};

export const addCategory = async (category: string) => {
    return await apiClient.post("manage/category/add", { category });
};

export const addSubCategory = async (subCategory: subCategory) => {
    return await apiClient.post("manage/category/add", { subCategory });
};

export const getCategories = async () => {
    return await apiClient.get("manage/category/getCategories");
};

export const getUsers = async (searchKey: string, page: number, limit: number): Promise<{ users: IUser[] | null; totalPages: number }> => {
    return await apiClient.get("manage/users", { params: { searchKey, page, limit } });
};

export const toggleUserBlockStatus = async (userId: string): Promise<void> =>{
    return await apiClient.patch(`manage/users/${userId}/block-toggle`);
}

export const getAdminTransactions = async (): Promise<void> => {
    return await apiClient.get("manage/transactions");
};


export const getDashboardData = async (): Promise<void> => {
    return await apiClient.get("manage/dashboard/data");
}