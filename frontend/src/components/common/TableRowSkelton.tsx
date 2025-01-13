import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableRowSkeletonProps {
    userType: "client" | "freelancer";
}

const TableRowSkeleton: React.FC<TableRowSkeletonProps> = ({ userType }) => {
    return (
        <TableRow className="h-20">
            {/* Skeleton for Application ID */}
            <TableCell className="font-medium">
                <Skeleton className="h-6 w-24 rounded" />
            </TableCell>

            {/* Skeleton for Status */}
            <TableCell>
                <Skeleton className="h-6 w-16 rounded" />
            </TableCell>

            {/* Skeleton for Freelancer Name or Job Title */}
            <TableCell>
                <Skeleton className="h-6 w-32 rounded" />
            </TableCell>

            {/* Skeleton for Action Buttons */}
            <TableCell className="text-right">
                {userType === "client" ? (
                    <div className="flex justify-end space-x-2">
                        <Skeleton className="h-9 w-20 rounded" /> {/* Simulates Decline button */}
                        <Skeleton className="h-9 w-20 rounded" /> {/* Simulates Accept button */}
                    </div>
                ) : (
                    <div className="flex justify-end">
                        <Skeleton className="h-9 w-28 rounded" /> {/* Simulates View Details button */}
                    </div>
                )}
            </TableCell>
        </TableRow>
    );
};

export default TableRowSkeleton;
