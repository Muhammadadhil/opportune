import React, { useEffect } from "react";
import { useSocket } from "@/hooks/socket/useSocket";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { CustomToast } from "./Custom-Toast";
import { NotificationModal } from "./NotificationModal";
import useNotification from '@/hooks/notification/useNotification'

const Notification: React.FC = () => {
    // const [nots, setNots] = useState<any[]>([]);
    const { userInfo } = useSelector((state: RootState) => state.user);
    const socket = useSocket(userInfo?._id);

    const {data:notifications}=useNotification(userInfo?._id);

    // useEffect(()=>{
    //     setNots()
    // },[notifications])


    console.log('user notfication query data:',notifications);

    useEffect(() => {

        if (socket) {
            const handleNotification = (notification: any) => {
                toast.custom((t) => <CustomToast message={notification.message} t={t} />, {
                    position: "top-right",
                    duration: 8000,
                });
                // setNots((prev) => [notification, ...prev]);
            };

            socket.on("newNotification", handleNotification);

            return () => {
                socket.off("newNotification", handleNotification);
            };
        }

    }, [socket]);

    const clearNotifications = () => {
        // setNots([]);
    };
    // const nots=notifications?.data;

    return <NotificationModal notifications={notifications!} clearNotifications={clearNotifications} />;
    // return <div>hello</div>
};

export default Notification;
