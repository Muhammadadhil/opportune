import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from '@/components/chat/ChatWindow'
import { FreelancerDetails } from "@/components/common/FreelancerDetailsCard";
import {useEffect} from "react";
import MaxWidth from "@/layouts/MaxWidth";
import { useParams } from "react-router-dom";

const ChatPage: React.FC = () => {

    useEffect(()=>{

    },[])

    const { chatRoomId } = useParams();


    return (
        // <div>
        //     <h1>chat page</h1>
        //     <div className="flex ">
        //         <div className="w-[800px] h-screen bg-slate-200">
        //             <h2 className="text-2xl font-bold text-center pt-4 text-gray-800">Messages</h2>

        //         </div>
        //         <div className="w-[1900px] h-screen bg-gray-400">
        //             <h2 className="text-2xl font-bold text-center pt-4 text-gray-800">Muhammad adhil</h2>

        //         </div>
        //         <div className="w-[800px] h-screen bg-slate-100">
        //             <h2 className="text-2xl font-bold text-center pt-4 text-gray-800">details</h2>
        //         </div>
        //     </div>
        // </div>

        <MaxWidth>
            <div className="flex h-screen ">
                <ChatSidebar />
                <ChatWindow chatRoomId={chatRoomId}/>
                <div className="w-3/12 p-4">
                    <FreelancerDetails name="John Doe" imageUrl="/path-to-image.jpg" description="Experienced web developer specializing in React and Node.js with 5 years of industry experience." />
                </div>
            </div>
        </MaxWidth>
    );
};

export default ChatPage;
