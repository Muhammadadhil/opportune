import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button1";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useClientOffers from "@/hooks/offers/useClientOffers";
import useFreelancerOffers from "@/hooks/offers/useFreelancerOffers";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IOffer } from "@/types/IOffer";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import SkeletonCard from "../common/LoadingSkelton";
import { useAcceptOffer } from "@/hooks/offers/useAcceptOffer";
import { ChevronDown, ChevronUp } from "lucide-react";
import { truncateString } from "@/utils/truncateString";
import { createNotification } from "@/api/notification";
import { useNavigate } from "react-router-dom";
import { handleInitChat } from "@/utils/chatUtils";
import  MilestoneStepper from '@/components/ui/MIlestone-stepper'

interface OffersListProps {
    userType: "client" | "freelancer";
}

interface ExpandedCard {
    status: boolean;
    id: string;
}


export const OffersList: React.FC<OffersListProps> = ({ userType }) => {
    const { userInfo } = useSelector((state: RootState) => state.user);

    const [isExpanded, setIsExpanded] = useState<ExpandedCard>({
        status: false,
        id: "",
    });
    const userId = userInfo?._id;

    const { data: freelancerOffers, isLoading: freelancerLoading } = useFreelancerOffers(userInfo.role === "freelancer" ? userId : null);
    const { data: clientOffers, isLoading: clientLoading } = useClientOffers(userInfo.role === "client" ? userId : null);

    const offers = userType === "client" ? clientOffers?.data?.offers : freelancerOffers?.data;

    const { mutateAsync: acceptOfferMutation } = useAcceptOffer();

    const acceptOrReject = async (offerId: string, status: string, clientId: string) => {
        try {
            acceptOfferMutation({ offerId, status });
            toast.success(`Offer ${status} !`);

            await createNotification(clientId, `Freelancer ${userInfo?.firstname + " " + userInfo?.lastname} has accepted your offer.`, "info");
        } catch (error) {
            console.log("Error accepting offer:", error);
            toast.error("Failed to accept the offer.");
        }
    };

    const toggleExpand = (id: string) => {
        setIsExpanded((prev) => ({ status: !prev.status, id }));
    };

    const navigate = useNavigate();

    const handleNavigateProfile = (userId: string) => {
        navigate("/user/" + userId);
    };

    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6 ">
            {!offers?.length && (
                <div className="text-center py-10 ">
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
                                    <AvatarFallback>{userType === "client" ? offer.freelancerId.charAt(0).toUpperCase() : offer.clientId?.firstname?.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-lg">{offer.workTitle}</h3>
                                    <p
                                        className="text-sm text-muted-foreground mt-1 font-semibold text-green-600 hover:underline hover:text-green-800 cursor-pointer"
                                        onClick={() => handleNavigateProfile(userType === "client" ? offer.freelancerId : offer.clientId._id)}
                                    >
                                        {userType === "client" ? `Freelancer: ${offer.freelancerId}` : `${offer.clientId?.firstname + " " + offer.clientId?.lastname}`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Badge variant={offer.status === "accepted" ? "outline" : "secondary"} className="self-center">
                                    {offer.status}
                                </Badge>
                                <Button className="mt-4 border-green-600" variant="outline" onClick={() => handleInitChat(offer.freelancerId, offer.clientId._id, userInfo, navigate)}>
                                    Chat with Client
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground">{truncateString(offer.workDescription, 100)}</p>
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
                        <div className="w-full flex justify-center">
                            <Button variant="outline" size="sm" className="mt-4 text-center " onClick={() => toggleExpand(offer._id)}>
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
                        </div>

                        {offer.milestones.length > 0 && isExpanded.status && isExpanded.id === offer._id && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: isExpanded.status && isExpanded.id === offer._id ? "auto" : 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden mt-4 border-t pt-4"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm font-medium">Milestone Preview</p>
                                </div>

                                <MilestoneStepper milestones={offer.milestones} />
                                
                            </motion.div>
                        )}
                    </CardContent>

                    <CardFooter className="bg-muted/50 p-6">
                        <div className="w-full ">
                            {userType === "freelancer" && offer.status === "pending" ? (
                                <div className="flex justify-between w-full">
                                    <div className="space-x-2">
                                        <Button variant="outline" onClick={() => acceptOrReject(offer._id!, "rejected", offer.clientId._id)}>
                                            Reject Offer
                                        </Button>
                                        <Button className="bg-green-800 hover:bg-green-700" onClick={() => acceptOrReject(offer._id!, "accepted", offer.clientId._id)}>
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
        </motion.div>
    );
};
