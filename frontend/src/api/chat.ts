import apiClient from "./axiosInstance";
import {IChatRoom} from '@/types/IChatRoom';
import { IMessage } from '@/types/IMessage';

export const getChatRoom = async (freelancerId:string,clientId:string) => {
    return await apiClient.post("/messaging/chat-room", { freelancerId, clientId });
};

export const getChatRooms = async (userId: string): Promise<IChatRoom[]> => {
    const response = await apiClient.get(`messaging/user/chats/${userId}`);
    return response.data;
};

export const getMessages = async (chatRoomId: string): Promise<IMessage[]> => {
    const response = await apiClient.get(`messaging/messages/${chatRoomId}`);
    return response.data;
};