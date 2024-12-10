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


//  async getUserNotifications(userId: string): Promise<Notification[]> {
//     const response = await axios.get(`${API_URL}/${userId}`);
//     return response.data;
//   },

//   async markNotificationAsRead(notificationId: string): Promise<Notification> {
//     const response = await axios.patch(`${API_URL}/${notificationId}/read`);
//     return response.data;
//   },