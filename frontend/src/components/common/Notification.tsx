import React, { useEffect } from "react";
import { useSocket } from "@/hooks/socket/useSocket";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { CustomToast } from "./Custom-Toast";
import { NotificationModal } from "./NotificationModal";
import useNotification from '@/hooks/notification/useNotification'

const Notification: React.FC = () => {
    
    const { userInfo } = useSelector((state: RootState) => state.user);

    const socket = useSocket(userInfo?._id,userInfo?.role);

    const { data:notifications,refetch } = useNotification(userInfo?._id);

    useEffect(() => {

        if (socket) {

            const handleNotification = (notification: any) => {

                toast.custom((t) => <CustomToast message={notification.message} t={t} />, {
                    position: "top-right",
                    duration: 8000,
                });
                refetch();
            };

            socket.on("newNotification", handleNotification);

            return () => {
                socket.off("newNotification", handleNotification);
            };
        }

    }, [socket]);

    return <NotificationModal notifications={notifications!}  />;
};

export default Notification;
