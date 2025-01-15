import { getChatRoom } from "@/api/chat";
import { userInfo } from "@/types/IUserState";
import { getChatParticipants } from "@/utils/getChatUser";
import { NavigateFunction } from "react-router-dom";

export const handleInitChat = async (senderId: string, receiverId: string, userInfo: userInfo, navigate: NavigateFunction) => {
    const response = await getChatRoom(senderId, receiverId);
    const { currentUser, otherUser } = getChatParticipants(response.data, userInfo?._id ?? '');

    navigate("/chat", {
        state: {
            chatRoomId: response.data._id,
            sender: currentUser,
            receiver: otherUser,
        },
    });
};
