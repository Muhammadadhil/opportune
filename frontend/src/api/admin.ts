import apiClient from "./apiClient/axios";

export const loginAdmin = async (email: string, password: string) => {
    return await apiClient.post("manage/login", {
        email,
        password,
    });
};

export const logoutAdmin = async () => {
    return await apiClient.patch("manage/logout");
};


export const addCategory=async ()=>{
    return await apiClient.post("manage/addCategory");
}