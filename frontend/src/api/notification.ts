import apiClient from "./axiosInstance";
import { INotification } from "../types/INotification";

export const createNotification = async (userId: string, message: string, type: string): Promise<INotification> => {
    const response = await apiClient.post('/notification/create', {
        userId,
        message,
        type,
    });
    return response.data;
};

export const getUserNotifications = async (userId: string): Promise<INotification[]> => {
    const response = await apiClient.get(`/notification/notifications/${userId}`);
    return response.data;
};

export const markNotificationAsRead = async (userId: string): Promise<INotification[]> =>{
    const response = await apiClient.patch(`/notification/notification/read/${userId}`);
    return response.data;
}