import React, { useState, useEffect } from "react";
import { useSocket } from "@/hooks/socket/useSocket";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { CustomToast } from "./Custom-Toast";
import { NotificationModal } from "./NotificationModal";

const Notification: React.FC = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const { userInfo } = useSelector((state: RootState) => state.user);
    const socket = useSocket(userInfo?._id);

    useEffect(() => {

        if (socket) {
            const handleNotification = (notification: any) => {
                toast.custom((t) => <CustomToast message={notification.message} t={t} />, {
                    position: "top-right",
                    duration: 8000,
                });
                setNotifications((prev) => [notification, ...prev]);
            };

            socket.on("newNotification", handleNotification);

            return () => {
                socket.off("newNotification", handleNotification);
            };
        }

    }, [socket]);

    const clearNotifications = () => {
        setNotifications([]);
    };

    return <NotificationModal notifications={notifications} clearNotifications={clearNotifications} />;
};

export default Notification;
