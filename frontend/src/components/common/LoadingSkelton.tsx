import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-black p-4 rounded-lg border shadow-sm space-y-4">
            {/* Job Title and Dropdown Skeleton */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32 rounded" /> {/* Job Title */}
                <Skeleton className="h-5 w-5 rounded-full" /> {/* Dropdown Icon */}
            </div>

            {/* Job Description Skeleton */}
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />

            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
            </div>

            {/* Budget and Skills Skeleton */}
            <div className="flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0">
                <Skeleton className="h-4 w-24 rounded" /> {/* Budget */}
                <Skeleton className="h-4 w-32 rounded" /> {/* Skills */}
            </div>

            {/* Category Skeleton */}
            <Skeleton className="h-4 w-1/2 rounded" /> {/* Category */}
        </div>
    );
}
