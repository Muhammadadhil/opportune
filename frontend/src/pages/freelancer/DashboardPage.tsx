import Dashboard from "@/components/freelancer/DashBoard";
import { useState,useEffect } from "react";

import io from "socket.io-client";
import toast from "react-hot-toast";
import { showCustomToast } from "@/utils/custom-toast";
import { CustomToast } from "@/components/common/Custom-Toast";


const DashboardPage = () => {

    // const [socket, setSocket] = useState(null);

    useEffect(()=>{

        const newSocket = io("http://localhost:3050");
        // setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);

            // // Emit registration if you have a user ID
            // const userId = localStorage.getItem("userId");
            // if (userId) {
            //     newSocket.emit("register", userId);
            // }
        });

        newSocket.on("connect_error", (error) => {
            console.error("Connection Error:", error);
        });

        newSocket.on("newNotification", (notification) => {
            console.log('notification from backend:',notification);
            
            toast.custom((t)=> <CustomToast message={notification.message} t={t}/>);
            // showCustomToast(notification.message);
        });


        return () => {
            newSocket.disconnect();
        };

    },[])




    return (
        <>
            <Dashboard />
        </>
    );
};

export default DashboardPage;
