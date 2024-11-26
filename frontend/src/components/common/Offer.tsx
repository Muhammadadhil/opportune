import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useClientOffers from "@/hooks/jobs/useClientOffers";
import useFreelancerOffers from "@/hooks/jobs/useFreelancerOffers";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IOffer } from "@/types/IOffer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TableRowSkelton from "@/components/common/TableRowSkelton";
import toast from "react-hot-toast";

interface OffersListProps {
    userType: "client" | "freelancer";
}

export const OffersList: React.FC<OffersListProps> = ({ userType }) => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const userId = userInfo?._id;

    // Fetch client and freelancer offers
    const { data: freelancerOffers, isLoading: freelancerLoading } = useFreelancerOffers(userInfo.role === 'freelancer' ? userId : null );
    
    const { data: clientOffers, isLoading: clientLoading, refetch: refetchClientOffers } = useClientOffers(userInfo.role === "client" ? userId : null);
    

    const offers = userType === "client" ? clientOffers?.data?.offers : freelancerOffers?.data;
    console.log("freelancerOffers",freelancerOffers);
    console.log('offers:',offers);

    const acceptOffer = async (offerId: string) => {
        try {
            setLoading(true);
            // Accept offer API call (for freelancers)
            // const response = await acceptOfferApi(offerId);
            toast.success("Offer accepted successfully!");
            setTimeout(() => {
                refetchClientOffers(); // Refetch after accepting
            }, 1000);
        } catch (error) {
            console.log("Error accepting offer:", error);
            toast.error("Failed to accept the offer.");
        } finally {
            setLoading(false);
        }
    };

    const truncateString = (str: string, limit: number = 30) => {
        if (str.length <= limit) return str;
        return str.slice(0, limit) + " ...";
    };

    return (
        <div className="mx-auto px-4 py-8">
            {offers?.length < 1 && (
                <div className="text-center">
                    <h2>No offers found</h2>
                </div>
            )}
            {clientLoading || freelancerLoading ? (
                Array.from({ length: 5 }).map(() => <TableRowSkelton userType={userType} />)
            ) : (
                <Table className="border">
                    <TableCaption>A list of your recent offers.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Id</TableHead>
                            <TableHead>Status</TableHead>
                            {userType === "client" ? <TableHead>Freelancer Name</TableHead> : <TableHead>Job Title</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {offers?.map((offer: IOffer) => (
                            <TableRow className="h-20" key={offer._id}>
                                <TableCell className="font-medium">OFFER{offer._id}</TableCell>
                                <TableCell>
                                    <div className={`w-24 h-8 rounded-xl text-center flex items-center justify-center ${offer.status === "accepted" ? "bg-green-500" : "bg-gray-400"}`}>
                                        <p className="text-white font-semibold">{offer.status}</p>
                                    </div>
                                </TableCell>
                                {userType === "client" ? (
                                    <TableCell>{offer?.freelancerId}</TableCell>
                                ) : (
                                    // <TableCell>{truncateString(offer?.jobDetails?.jobTitle ?? "")}</TableCell>
                                    <TableCell>jobTitle</TableCell>
                                )}
                                <TableCell className="text-right">
                                    {userType === "freelancer" && offer.status === "pending" ? (
                                        <Button className="bg-green-800 hover:bg-green-700" onClick={() => acceptOffer(offer._id!)} disabled={loading}>
                                            Accept Offer
                                        </Button>
                                    ) : userType === "client" ? (
                                        <Button>View Details</Button>
                                    ) : (
                                        <Button>Contact Client</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};
