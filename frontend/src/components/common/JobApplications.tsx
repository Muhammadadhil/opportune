import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useApplications from "@/hooks/jobs/useApplications";
import useFreelancerApplications from "@/hooks/jobs/useFreelancerApplications";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IApplication } from "@/types/IApplication";
import { useParams } from "react-router-dom";
import { approveApplication } from "@/api/jobsApi";
import { IApproval } from "@/types/IApproval";
import toast from "react-hot-toast";
import { useState } from "react";
import TableRowSkelton from '@/components/common/TableRowSkelton';


interface JobApplicationsProps {
    userType: "client" | "freelancer";
}

export const JobApplications: React.FC<JobApplicationsProps> = ({ userType }) => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(false);

    const userId = userInfo?._id;
    const { id: jobId } = useParams();

    const { data: clientApplications, refetch: refetchClientApplications, isLoading:clientLoading } = useApplications(userId, jobId!);
    console.log("clientApplications:", clientApplications);

    const { data: freelancerApplications, isLoading: freelancerLoading } = useFreelancerApplications(userId);
    console.log("freelancerApplications:", freelancerApplications);

    const applications = userType === "client" ? clientApplications?.data?.applications : freelancerApplications?.data?.applications;

    const acceptApplication = async (appId: string, jobId: string, fId: string) => {
        if (userType !== "client") return;
        try {
            setLoading(true);
            const data: IApproval = { applicationId: appId, jobId, freelancerId: fId, clientId: userId };
            const response = await approveApplication(data);
            toast.success(response.data.message);
            setTimeout(() => {
                refetchClientApplications();
            }, 1000);
        } catch (error) {
            console.log("Error in approval:", error);
            toast.error("Error in approval");
        } finally {
            setLoading(false);
        }
    };

    const truncateString=(str: string, limit: number=30)=>{
        if(str.length <= limit) return str;
        return str.slice(0,limit)+" ...";
    }

    return (
        <div className="mx-auto px-4 py-8">
            {clientLoading || freelancerLoading ? Array.from({ length: 5 }).map(() => <TableRowSkelton />) : ""}
            {applications?.length < 1 ? (
                <div className="text-center">
                    <h2>No applications found</h2>
                </div>
            ) : (
                <Table className="border">
                    <TableCaption>A list of your recent applications.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Id</TableHead>
                            <TableHead>Status</TableHead>
                            {userType === "client" ? <TableHead>Freelancer Name</TableHead> : <TableHead>Job Title</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications?.map((app: IApplication) => (
                            <TableRow className="h-20" key={app._id}>
                                <TableCell className="font-medium">APP{app._id}</TableCell>
                                <TableCell>{app.status}</TableCell>
                                {userType === "client" ? (
                                    <TableCell>{app?.freelancerDetails?.firstname + " " + app?.freelancerDetails?.lastname}</TableCell>
                                ) : (
                                    <TableCell>{truncateString(app?.jobDetails?.jobTitle ?? "")}</TableCell>
                                    // <TableCell>job title</TableCell>
                                )}
                                <TableCell className="text-right">
                                    {userType === "client" && app.status === "pending" ? (
                                        <div>
                                            <Button variant="default" className="mr-2" >
                                                Decline
                                            </Button>
                                            <Button
                                                className="bg-green-800 hover:bg-green-700"
                                                onClick={() => acceptApplication(app._id ?? "", app.jobId, app?.freelancerDetails?._id ?? "")}
                                                disabled={loading}
                                            >
                                                {loading ? "Accepting..." : "Accept"}
                                            </Button>
                                        </div>
                                    ) : userType === "client" ? (
                                        <Button>Contact freelancer</Button>
                                    ) : (
                                        <Button >View Details</Button>
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
