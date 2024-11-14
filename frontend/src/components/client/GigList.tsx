import GigCard from "../common/GigCard";
import { useGigs } from "@/hooks/gigs/useGigs";
import { IGig } from "@/types/IGig";
import { GigCardSkeleton } from "@/components/common/CardSkelton";

const GigList = () => {
    const { data: gigs, isLoading } = useGigs();

    return (
        // <div className="w-full md:w-12/12 order-2 lg:order-1 flex gap-6 flex-wrap mt-16">
        <div className="grid grid-cols-12 gap-5 justify-center mt-16">
            {isLoading && Array.from({ length: 5 }).map(() => <GigCardSkeleton />)}
            {gigs?.data?.map((gig: IGig) => {
                return <GigCard gig={gig} />;
            })}
        </div>

        // </div>
    );
};

export default GigList;
