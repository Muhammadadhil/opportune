import apiClient from "./axiosInstance";

export const getChatRoom = async (freelancerId:string,clientId:string) => {
    return await apiClient.post("/messaging/chat-room", { freelancerId, clientId });
};
