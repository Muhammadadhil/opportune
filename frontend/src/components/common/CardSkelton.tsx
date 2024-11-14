import { Skeleton } from "@/components/ui/skeleton";

export function GigCardSkeleton() {
    return (
        <div className="min-w-72 overflow-hidden group">
            <div className="relative aspect-[2/1] overflow-hidden">
                <Skeleton className="h-full w-full" />
                <Skeleton className="absolute top-3 right-3 h-6 w-6 rounded-full" />
            </div>

            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="flex items-center gap-1 text-sm">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-12" />
                </div>

                <div className="space-y-2 text-sm">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-5 w-1/3" />
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                </div>
            </div>
        </div>
    );
}
