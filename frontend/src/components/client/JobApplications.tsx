// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell,TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {Button} from '@/components/ui/button';
import useApplications from '@/hooks/jobs/useApplications';
import {useSelector} from 'react-redux'
import {RootState} from '@/store/store';
import {IApplication} from '@/types/IApplication';
import {useParams} from 'react-router-dom';
// import TableRowSkelton from '@/components/common/TableRowSkelton';
import {approveApplication} from '@/api/jobsApi'; 
import {IApproval} from '@/types/IApproval';
import toast from 'react-hot-toast';
import NoItems from '@/components/ui/NoJob';
import { setTimeout } from "timers/promises";
import { useState } from "react";


export const JobApplications: React.FC = () => {

    const {userInfo}=useSelector((state:RootState)=> state.user);
    const [loading,setLoading]=useState(false);

    const clientId = userInfo?._id;
    const {id} = useParams();

    const {data:applications,refetch} = useApplications(clientId,id!);
    
    const acceptApplication=async(appId:string,jobId:string,fId:string)=>{
       try{
        setLoading(true);
         const data: IApproval = { applicationId: appId, jobId, freelancerId: fId, clientId };
         const response = await approveApplication(data);
         console.log("response:", response);
         toast.success(response.data.message); 
         window.setTimeout(() => {
             refetch();
         }, 1000);
         
       }catch(error){
        console.log('Error in approval:',error);
        toast.error("Error in approval");
       }finally{
        setLoading(false);   
       }
    }

    const handleRefetch=()=>{
        refetch();
    }

    return (
        <div className="mx-auto px-4 py-8">
            {applications?.data?.applications.length < 1 ? (
                <div className="text-center">
                    <h2>No applications right now</h2>
                </div>
            ) : (
                <Table className="border ">
                    <TableCaption>A list of your recent applications.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Id</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* {isLoading && applications?.data?.applications.map(() => <TableRowSkelton />)} */}

                        {applications?.data?.applications.map((app: IApplication) => {
                            return (
                                <TableRow className="h-20" key={app._id}>
                                    <TableCell className="font-medium">APP{app._id}</TableCell>
                                    <TableCell>{app.status}</TableCell>
                                    <TableCell>{app?.freelancerDetails?.firstname + " " + app?.freelancerDetails?.lastname}</TableCell>
                                    <TableCell className="text-right ">
                                        {app.status == "pending" ? (
                                            <div className="">
                                                <Button variant="default" className="" onClick={handleRefetch}>
                                                    Decline
                                                </Button>
                                                <Button className="mx-8 bg-green-800 hover:bg-green-700" onClick={() => acceptApplication(app._id, app.jobId, app?.freelancerDetails._id)}>
                                                    {loading ? "Accepting..." : "Accept"}
                                                </Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Button> contact freelancer</Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};
