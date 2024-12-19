import { Card, CardContent,CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useClientOffers from "@/hooks/offers/useClientOffers";
import useFreelancerOffers from "@/hooks/offers/useFreelancerOffers";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IOffer } from "@/types/IOffer";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { IMilestone } from "@/types/IOffer";
import SkeletonCard from '../common/LoadingSkelton';
import { useAcceptOffer } from '@/hooks/offers/useAcceptOffer';
import { ChevronDown, ChevronUp } from "lucide-react";
import { truncateString } from '@/utils/truncateString';
import {createNotification} from '@/api/notification';
import {getChatRoom} from '@/api/chat';
import { useNavigate } from 'react-router-dom';

interface OffersListProps {
    userType: "client" | "freelancer";
}

export const OffersList: React.FC<OffersListProps> = ({ userType }) => {
    
    const { userInfo } = useSelector((state: RootState) => state.user);

    const [isExpanded,setIsExpanded]=useState<boolean>(false);    
    const userId = userInfo?._id;       

    const { data: freelancerOffers, isLoading: freelancerLoading } = useFreelancerOffers(userInfo.role === "freelancer" ? userId : null);
    const { data: clientOffers, isLoading: clientLoading} = useClientOffers(userInfo.role === "client" ? userId : null);

    const offers = userType === "client" ? clientOffers?.data?.offers : freelancerOffers?.data;

    const { mutateAsync: acceptOfferMutation } = useAcceptOffer();

    const acceptOrReject = async (offerId: string,status:string,clientId:string) => {
        try {
            acceptOfferMutation({offerId,status});
            toast.success(`Offer ${status} !`);

            await createNotification(
                clientId,
                `Freelancer ${userInfo?.firstname+ " "+ userInfo?.lastname} has accepted your offer.`,
                "info"
            );
            
        } catch (error) {
            console.log("Error accepting offer:", error);
            toast.error("Failed to accept the offer.");
        }
    };

    const toggleExpand = (offerId:string) => {
        setIsExpanded(!isExpanded);
    };

    const navigate = useNavigate();

    const handleInitChat = async (sender: string, receiver: string) => {
        const response = await getChatRoom(sender, receiver);
        console.log("response chatroom:", response);
        navigate(`/chat/?chatRoomId=${response.data._id}&senderId=${sender}&receiverId=${receiver}`);
    };

    return (
        <div className="space-y-6">
            {!offers?.length && (
                <div className="text-center py-10">
                    <h2 className="text-xl font-semibold text-gray-700">No offers found</h2>
                </div>
            )}
            {(clientLoading || freelancerLoading) && <SkeletonCard />}
            {offers?.map((offer: IOffer) => (
                <Card key={offer._id} className="overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4 ">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback>{userType === "client" ? offer.freelancerId.charAt(0).toUpperCase() : offer.clientId.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {offer.workTitle}
                                        <Badge variant={offer.status === "accepted" ? "success" : "secondary"} className="ml-2">
                                            {offer.status}
                                        </Badge>
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">{userType === "client" ? `Freelancer: ${offer.freelancerId}` : `Client: ${offer.clientId}`}</p>
                                </div>
                                <div className="">
                                    <Button className="mt-4 " onClick={() => handleInitChat(offer.freelancerId,offer.clientId)}>
                                        Chat with Client
                                    </Button>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full"></Button>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground">{truncateString(offer.workDescription)}</p>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium">Total Amount</p>
                                <p className="text-xl font-bold text-green-500">${offer.totalAmount.toFixed()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">Milestones</p>
                                <p className="text-lg font-semibold">{offer.milestones.length}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => toggleExpand(offer._id)}>
                            {isExpanded ? (
                                <>
                                    Hide Milestone Details
                                    <ChevronUp className="ml-2 h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    Show Milestone Details
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                        {offer.milestones.length > 0 && isExpanded && (
                            <div className="mt-4 border-t pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm font-medium">Milestone Preview</p>
                                    <Button variant="ghost" size="sm" className="text-xs">
                                        {/* View All <ChevronRight className="ml-1 h-3 w-3" /> */}
                                    </Button>
                                </div>
                                <div className="space-y-1">
                                    {offer.milestones.map((milestone: IMilestone, index: number) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="truncate flex-1 mr-2">{milestone.description}</span>
                                            <span className="font-medium">${milestone.amount.toFixed(2)}</span>
                                        </div>
                                    ))}
                                    {/* {offer.milestones.length > 2 && <p className="text-xs text-muted-foreground italic">+ {offer.milestones.length - 2} more</p>} */}
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="bg-muted/50 p-6">
                        <div className="w-full flex justify-end">
                            {userType === "freelancer" && offer.status === "pending" ? (
                                <div className="flex justify-between w-full">
                                    <div className="space-x-2">
                                        <Button className="bg-blue-800 hover:bg-blue-700" onClick={() => acceptOrReject(offer._id!, "rejected", offer.clientId)}>
                                            Reject Offer
                                        </Button>
                                        <Button className="bg-green-800 hover:bg-green-700" onClick={() => acceptOrReject(offer._id!, "accepted", offer.clientId)}>
                                            Accept Offer
                                        </Button>
                                    </div>
                                </div>
                            ) : userType === "client" ? (
                                <Button>View Details</Button>
                            ) : null}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};
