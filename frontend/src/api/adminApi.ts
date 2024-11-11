import apiClient from "./axiosInstance";

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
