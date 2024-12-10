import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import  SkeletonCard  from "../common/LoadingSkelton";
import { useParams } from "react-router-dom";
import useHires from "@/hooks/contracts/useHires";
import {formatDate}  from "@/utils/dateFormatter";

const Hires: React.FC = () => {

    const { id: jobId } = useParams();

    const { data: hires, isLoading } = useHires(jobId!);

    console.log('hires:', hires);

    const truncateString = (str: string, limit: number = 30) => {
        if (str.length <= limit) return str;
        return str.slice(0, limit) + " ...";
    };

    return (
        <>
            <div className="mx-auto px-4 py-8">
                {hires?.data.length < 1 && (
                    <div className="text-center">
                        <h2>No contractlications found</h2>
                    </div>
                )}
                {isLoading ? (
                    Array.from({ length: 5 }).map(() => <SkeletonCard />)
                ) : (
                    <Table className="border">
                        <TableCaption>A list of your recent applications.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Id</TableHead>
                                <TableHead>Started At</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Freelancer Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {hires?.data.map((contract) => (
                                <TableRow className="h-28" key={contract._id}>
                                    <TableCell className="font-medium">CON{contract._id}</TableCell>
                                    <TableCell>{formatDate(contract.createdAt)}</TableCell>
                                    <TableCell>{contract.status}</TableCell>
                                    <TableCell className="">
                                        {contract.freelancerId}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </>
    );
};

export default Hires;
