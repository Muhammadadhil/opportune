import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function GigCardSkeleton() {

    const { userInfo } = useSelector((state: RootState) => state.user);
    
    const isFreelancer = userInfo?.role === "freelancer";

    return (
        <div className={`min-w-[250px] col-span-12 sm:col-span-6  ${isFreelancer ? "md:col-span-6 xl:col-span-4" : "md:col-span-4 2xl:col-span-3"} overflow-hidden group min`}>
            <div className="relative aspect-[2/1] overflow-hidden w-full">
                <Skeleton className="h-full w-full" />
                <Skeleton className="absolute top-3 right-3 h-6 w-6 rounded-full" />
            </div>

            <div className="p-4 space-y-4 w-full">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-3/4" /> {/* For title */}
                    <Skeleton className="h-4 w-5/6" /> {/* For subtitle/description */}
                </div>

                <div className="flex items-center gap-1 text-sm">
                    <Skeleton className="h-4 w-4" /> {/* For star icon */}
                    <Skeleton className="h-4 w-8" /> {/* For rating */}
                    <Skeleton className="h-4 w-12" /> {/* For reviews count */}
                </div>

                <div className="space-y-2 text-sm text-center">
                    <Skeleton className="h-4 w-1/2 " /> {/* For delivery time */}
                    <Skeleton className="h-5 w-1/3 " /> {/* For price */}
                </div>
            </div>
        </div>
    );
}
