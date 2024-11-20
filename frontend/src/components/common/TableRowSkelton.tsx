import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";


const TableRowSkelton = () => {
  return (
    <div>
      <TableRow className="h-20">
    {/* Skeleton for Application ID */}
    <TableCell className="font-medium">
        <Skeleton className="h-6 w-24 rounded" /> {/* Simulates APP{app._id} */}
    </TableCell>

    {/* Skeleton for Status */}
    <TableCell>
        <Skeleton className="h-6 w-16 rounded" /> {/* Simulates app.status */}
    </TableCell>

    {/* Skeleton for Freelancer Name */}
    <TableCell>
        <Skeleton className="h-6 w-32 rounded" /> {/* Simulates freelancerDetails name */}
    </TableCell>

    {/* Skeleton for Buttons */}
    <TableCell className="text-right">
        <div className="flex justify-end space-x-4">
            <Skeleton className="h-10 w-24 rounded" /> {/* Simulates Decline button */}
            <Skeleton className="h-10 w-24 rounded" /> {/* Simulates Approve button */}
        </div>
    </TableCell>
</TableRow>

    </div>
  )
}

export default TableRowSkelton

