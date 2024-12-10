import { useState } from "react";
import { MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/store/store";
import useContracts from "@/hooks/contracts/useContracts";
import { IContract } from "@/types/IContract";
import { truncateString } from "@/utils/truncateString";
// import YourPaymentComponent from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { createChekcoutSession } from '@/api/contracts';
import { IPaymentData } from '@/types/IPaymentData';

interface ContractsProps {
    userType: "client" | "freelancer";
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const Contracts: React.FC<ContractsProps> = ({ userType }) => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const userId = userInfo?._id;

    // const [showPaymentComp,setShowPaymentComp] = useState(false);

    const { data: contracts } = useContracts(userId, userType);
    const [expandedContracts, setExpandedContracts] = useState<string[]>([]);

    console.log('contracts:',contracts)

    const handleViewDetails = (contractId: string) => {
        console.log(`Viewing details for contract ${contractId}`);
    };

    const handlePayMilestone = async (data: IPaymentData) => {
        console.log(`Processing payment for milestone ${data.milestoneAmount} in contract ${data.contractId} for freelancer ${data.freelancerId} and client ${data.clientId} milestoneId: ${data.milestoneId}`);

        const stripe = await stripePromise;
        const response = await createChekcoutSession(data);

        if (!stripe) {
            console.log('stripe not loaded yet');
            return;
        }
        
        stripe.redirectToCheckout({
            sessionId: response.data,
        });
    };

    const toggleContractDetails = (contractId: string) => {
        setExpandedContracts((prev) => (prev.includes(contractId) ? prev.filter((id) => id !== contractId) : [...prev, contractId]));
    };

    if (!contracts?.data?.length) {
        return (
            <div className="text-center py-8">
                <h2 className="text-xl font-semibold text-gray-700">No contracts found</h2>
            </div>
        );
    }

    console.count('render count contract');

    return (
        <div className="space-y-4 mt-6">
            {contracts.data.map((contract: IContract) => {
                const isExpanded = expandedContracts.includes(contract._id);
                return (
                    <Card key={contract._id} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-lg">{contract.workTitle}</h3>
                                        <p className="text-sm text-muted-foreground">Created {format(new Date(contract.startDate), "MMM d, yyyy")}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant={contract.status === "active" ? "default" : "secondary"}>{contract.status}</Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleViewDetails(contract._id)}>View details</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400">Contract ID</p>
                                        <p className="text-sm text-muted-foreground ">CON{contract._id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-400">Total Amount</p>
                                        <p className="text-sm text-muted-foreground">${contract.totalAmount}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-400">End Date</p>
                                        <p className="text-sm text-muted-foreground">{contract.endDate ? format(new Date(contract.endDate), "MMM d, yyyy") : "Ongoing"}</p>
                                    </div>
                                </div>
                                <div className="mt-4 w-full text-sm text-blue-800 flex items-center justify-center cursor-pointer" onClick={() => toggleContractDetails(contract._id)}>
                                    <span className="flex items-center">
                                        {isExpanded ? "Hide Full Details" : "Show Full Details"}
                                        {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                                    </span>
                                </div>
                                {isExpanded && contract.milestones && contract.milestones.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="text-sm font-medium mb-2">Milestones</h4>
                                        <div className="space-y-2">
                                            {contract.milestones.map((milestone, index) => (
                                                <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                                                    <div>
                                                        <p className="text-sm font-medium">{truncateString(milestone.description, 30)}</p>
                                                        <p className="text-sm text-muted-foreground">${milestone.amount.toFixed(2)}</p>
                                                    </div>
                                                    
                                                    {userType === "client" &&
                                                        milestone.status === "unpaid" && contract.currentMilestoneIndex==index &&(
                                                            <Button
                                                                size="sm"
                                                                onClick={() =>
                                                                    handlePayMilestone({
                                                                        milestoneId: milestone._id, 
                                                                        contractId: contract._id,
                                                                        milestoneAmount: milestone.amount.toString(), // Ensure amount is passed as a string
                                                                        clientId: contract.clientId,
                                                                        freelancerId: contract.freelancerId,
                                                                    })
                                                                }
                                                            >
                                                                Pay Milestone
                                                            </Button>
                                                        )}
                                                    <div className="">
                                                        <p className="text-sm font-medium text-gray-400">Milestone status</p>
                                                        <Badge variant={milestone.status === "unpaid" ? "default" : "secondary"}>{milestone.status}</Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        {/* {showPaymentComp && <YourPaymentComponent />} */}
                    </Card>
                );
            })}
        </div>
    );
};
