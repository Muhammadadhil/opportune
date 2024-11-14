import { Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageCarousal } from "@/components/common/ImageCarousel";
import EditGig from "../freelancer/EditGig";
import { editGigPost } from "@/api/gigsApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ConfirmDialog from "./ConfirmDialog";
import { IGig } from "@/types/IGig";

interface GigCardProps {
    gig: IGig;
    onUpdate?: (gigData: IGig) => void;
}

const GigCard: React.FC<GigCardProps> = ({ gig, onUpdate }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const { userInfo } = useSelector((state: RootState) => state.user);
    const HandleRemove = (gigId: string) => {

    };

    const handleEditSave = async (data: IGig) => {
        // console.log("gig updating data :", data);
        try {
            data._id = gig._id;
            await editGigPost(data);
            setIsDialogOpen(false);
            if (onUpdate) onUpdate(data);
        } catch (error) {
            console.error(error);
            toast.error("Error In Editing Gig");
        }
    };

    const isFreelancer = userInfo?.role === "freelancer";
    
    console.log("gig card data", gig);

    return (
        <Card className={`col-span-12 sm:col-span-6 md:col-span-4 ${isFreelancer ? "md:col-span-4" : "2xl:col-span-3"} overflow-hidden group`}>
            <div className="relative aspect-[2/1] overflow-hidden">
                <ImageCarousal array={gig.imageUrls} />
                {!isFreelancer && (
                    <button className="absolute top-3 right-3 p-1.5 bg-white rounded-full hover:bg-gray-100">
                        <Heart className="w-4 h-4" />
                    </button>
                )}
            </div>
            <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2">{gig.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{gig.description}</p>
                </div>

                {gig.averageRating && gig.reviewsCount && (
                    <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{gig.averageRating}</span>
                        <span className="text-muted-foreground">({gig.reviewsCount}+)</span>
                    </div>
                )}

                <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground mb-4">{gig.deliveryTime} days delivery</p>
                    <p className="text-gray-800 font-bold">From: {gig.price} </p>
                </div>

                {isFreelancer ? (
                    <div className="flex items-center justify-between pt-4 border-t">
                        <EditGig gig={gig} handleSave={handleEditSave} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
                        <ConfirmDialog
                            key={gig._id}
                            title="Remove the Gig ?"
                            description1="Are you sure you want to remove this gig?"
                            description2="You can access the removed gigs in manage gigs"
                            open={open}
                            setOpen={setOpen}
                            onConfirm={HandleRemove}
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">Starting at</span>
                        <span className="font-semibold">₹{gig.price}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default GigCard;
