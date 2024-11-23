import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import useContracts from "@/hooks/contracts/useContracts";
import { IContract } from "@/types/IContract";

interface ContractsProps {
    userType: "client" | "freelancer";
}

// interface IContract {
//     _id: string;
//     status: string;
//     jobDetails: {
//         jobTitle: string;
//     };
//     freelancerDetails: {
//         firstname: string;
//         lastname: string;
//     };
//     clientDetails: {
//         firstname: string;
//         lastname: string;
//     };
//     startDate: string;
//     endDate: string;
// }

export const Contracts: React.FC<ContractsProps> = ({ userType }) => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(false);
    const userId = userInfo?._id;

    const { data: contracts, refetch: refetchContracts } = useContracts(userId, userType);

    console.log('contracts fetched:',contracts);

    const truncateString = (str: string, num: number = 30) => {
        if (str.length <= num) return str;
        return str.slice(0, num) + "...";
    };

    const handleViewDetails = (contractId: string) => {
        console.log(`Viewing details for contract ${contractId}`);
    };

    const handleEndContract = async (contractId: string) => {
        setLoading(true);
        try {
            console.log(`Ending contract ${contractId}`);
            toast.success("Contract ended successfully");
            await refetchContracts();
        } catch (error) {
            console.error("Error ending contract:", error);
            toast.error("Error ending contract");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto px-4 py-8">
            {contracts?.data?.length === 0 ? (
                <div className="text-center">
                    <h2>No contracts found</h2>
                </div>
            ) : (
                <Table className="border">
                    <TableCaption>A list of your Contracts.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Contract Id</TableHead>
                            <TableHead>Status</TableHead>
                            {userType === "client" ? <TableHead>Freelancer Name</TableHead> : <TableHead>Client Name</TableHead>}
                            <TableHead>Job Title</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contracts?.data?.map((contract: IContract) => (
                            <TableRow className="h-20" key={contract._id}>
                                <TableCell className="font-medium">CON{contract._id}</TableCell>
                                <TableCell>{contract.status}</TableCell>
                                {/* {userType === "client" ? (
                                    <TableCell>{`${contract.freelancerDetails.firstname} ${contract.freelancerDetails.lastname}`}</TableCell>
                                ) : (
                                    <TableCell>{`${contract.clientDetails.firstname} ${contract.clientDetails.lastname}`}</TableCell>
                                )} */}
                                <TableCell>{truncateString("clent")}</TableCell>

                                {/* <TableCell>{truncateString(contract.jobDetails.jobTitle)}</TableCell> */}
                                <TableCell>{truncateString("title")}</TableCell>

                                <TableCell>{contract.startDate ? new Date(contract.startDate).toLocaleDateString() : "started"}</TableCell>

                                <TableCell>{contract.endDate ? new Date(contract.endDate).toLocaleDateString() : "Ongoing"}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="default" className="mr-2" onClick={() => handleViewDetails(contract._id)}>
                                        View Details
                                    </Button>
                                    {contract.status === "active" && (
                                        <Button className="bg-red-800 hover:bg-red-700" onClick={() => handleEndContract(contract._id)} disabled={loading}>
                                            {loading ? "Ending..." : "End Contract"}
                                        </Button>
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
