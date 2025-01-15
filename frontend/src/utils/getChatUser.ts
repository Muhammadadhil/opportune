import { IChatRoom } from "@/types/IChatRoom";
import { IUser } from "@/types/IUser";

export const getChatParticipants = (chat: IChatRoom,currentUserId: string): {
        currentUser: IUser;
        otherUser: IUser;
    } => {

        // console.log('chatRoom to get users:',chat)

        if (!chat?.participants?.length || chat.participants.length !== 2) {
            throw new Error("Invalid chat room participants");
        }

        const [participant1, participant2] = chat.participants;

        if (participant1._id === currentUserId) {
            
            return {
                currentUser: participant1,
                otherUser: participant2,
            };

        } else {
            return {
                currentUser: participant2,
                otherUser: participant1,
            };
        }
    };