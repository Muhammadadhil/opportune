import { IGig } from "@/types/IGig";
import { useGigs } from "@/hooks/gigs/useGigs";
import SkeletonCard from "./LoadingSkelton";
import Nojobs from "../ui/NoJob";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

const GigList = () => {
    const { data: gigs, isLoading } = useGigs();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex-grow p-4 md:p-6">
            <ul className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                ) : gigs?.data?.length === 0 ? (
                    <Nojobs />
                ) : (
                    gigs?.data?.map((gig: IGig) => (
                        <li key={gig?._id} className="bg-white p-4 rounded-lg border shadow-sm">
                            <div>
                                <h3 className="font-bold text-lg mb-2">{gig?.title}</h3>
                            </div>
                            <p className="text-gray-600 mb-2">{gig?.description}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {gig?.searchTags?.map((tag, idx) => (
                                    <span key={idx} className="bg-zinc-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                                <span>Price: ${gig?.price}</span>
                                <span>Delivery Time: {gig?.deliveryTime} days</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-2 flex justify-between">
                                <span>
                                    Category: {gig?.category} &gt; {gig?.subCategory}
                                </span>
                                {userInfo.role == "freelancer" && (
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger className=" rounded-xl transition duration-300 ease-in-out">
                                            <Button>remove gig</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Remove the Gig ?</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to remove this gig?
                                                    <span className="block"> You can access the removed jobs in manage jobs</span>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button variant="default" onClick={() => gig?._id && HandleRemove(gig?._id)}>
                                                    Remove
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default GigList;
