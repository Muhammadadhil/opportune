import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useApplications from "@/hooks/jobs/useApplications";
// import useFreelancerApplications from "@/hooks/jobs/useFreelancerApplications";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IApplication } from "@/types/IApplication";
import { useParams } from "react-router-dom";
import TableRowSkelton from '@/components/common/TableRowSkelton';
import { useNavigate } from 'react-router-dom';
import { truncateString } from "@/utils/truncateString";

interface JobApplicationsProps {
    userType: "client" | "freelancer";
}

export const JobApplications: React.FC<JobApplicationsProps> = ({ userType }) => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const userId = userInfo?._id;
    const { id: jobId } = useParams();

    const { data: Allapplications, isLoading } = useApplications(userId, jobId!, userType);
    const applications = Allapplications?.data.applications;

    // console.log('applications:',applications);
    return (
        <div className="mx-auto px-4 py-8 h-screen">
            {applications?.length > 0 ? (
                <Table className="border">
                    {isLoading && Array.from({ length: 5 }).map((arr, index) => <TableRowSkelton key={index} userType={userType} />)}
                    <TableCaption>A list of your recent applications.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Id</TableHead>
                            <TableHead>Status</TableHead>
                            {userType === "client" ? <TableHead>Freelancer Name</TableHead> : <TableHead>Job Title</TableHead>}
                        </TableRow>
                    </TableHeader>
                    {applications?.map((app: IApplication) => (
                        <>
                            <TableBody key={app._id}>
                                <TableRow className="h-20">
                                    <TableCell className="font-medium">APP{app._id}</TableCell>
                                    <TableCell>
                                        <div className={`w-24 h-8 rounded-xl text-center flex items-center justify-center ${app.status === "offerSent" ? "bg-green-500" : "bg-gray-400"}`}>
                                            <p className="text-white font-semibold">
                                                {app.status == "offerSent" && userType === "freelancer" ? "Accepted" : app.status == "offerSent" && userType === "client" ? "Offer Sent" : app.status}
                                            </p>
                                        </div>
                                    </TableCell>
                                    {userType === "client" ? (
                                        <TableCell>{app?.freelancerDetails?.firstname + " " + app?.freelancerDetails?.lastname}</TableCell>
                                    ) : (
                                        <TableCell>{truncateString(app?.jobDetails?.jobTitle ?? "")}</TableCell>
                                    )}
                                    <TableCell className="text-right">
                                        {userType === "client" && app.status === "pending" ? (
                                            <div>
                                                <Button
                                                    className="bg-green-800 hover:bg-green-700"
                                                    onClick={() =>
                                                        navigate(`/cl/send-offer/${app.jobId}`, {
                                                            state: { application: app },
                                                        })
                                                    }
                                                >
                                                    Send Offer
                                                </Button>
                                            </div>
                                        ) : userType === "client" ? (
                                            <Button>Contact freelancer</Button>
                                        ) : (
                                            <Button>View Details</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </>
                    ))}
                </Table>
            ) : (
                <div className="flex flex-col items-center justify-center h-[200px]">
                    <h2 className="text-xl font-semibold text-gray-700">No applications found</h2>
                </div>
            )}
        </div>
    );
};

