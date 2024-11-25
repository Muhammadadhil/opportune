import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useJobs } from "@/hooks/jobs/useJobs";
import { useState } from "react";
import { IJob } from "@/types/IJob";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import SkeletonCard from "../common/LoadingSkelton";
import EditJob from "./EditJob";
import { useRemoveJob } from "@/hooks/jobs/useDeleteJob";
import toast from "react-hot-toast";
import Nojobs from "../ui/NoJob";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import JobCard from "../common/JobCard";
import {useNavigate} from 'react-router-dom';
// import {formatDate} from '@/utils/dateFormatter';
import {getRelativeTime} from '@/utils/relativeDateFormatter';


export default function ClientJobs() {
    const [editingJob, setEditingJob] = useState<IJob | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    const navigate=useNavigate();

    const { userInfo } = useSelector((state: RootState) => state.user);
    const { data: jobs, isLoading, refetch } = useJobs(userInfo?._id as string);

    const handleEditClick = (job: IJob) => {
        setEditingJob(job);
        setIsDialogOpen(true);
    };

    const removeJobMutation = useRemoveJob();

    const HandleRemove = async (jobId:string) => {
        console.log('jobId: to remove:',jobId);
        await removeJobMutation.mutateAsync(jobId);
        refetch();
        toast.success('Job successfully removed');
    };

    const handleCloseDialog = async () => {
        setIsDialogOpen(false);
        setEditingJob(null);
        await refetch();
    };

    const handleJobClick=(job:IJob)=>{
        navigate(`/cl/jobdetail/${job._id}`,{state:{job}});
    }
    
    return (
        <div className="container mx-auto py-8 max-w-7xl">
            <div className="p-4 md:p-6 max-w-5xl">
                <h2 className="text-xl font-semibold mb-4">Your Jobs</h2>
                <ul className="space-y-4">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                    ) : jobs?.data?.length === 0 ? (
                        <Nojobs />
                    ) : (
                        jobs?.data?.map((job: IJob,index) => (
                            <li key={job._id} className="bg-white p-4 rounded-lg border shadow-sm hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer">
                                <div className="flex justify-between">
                                    <h3 className="font-bold text-lg mb-2 hover:underline" onClick={() => handleJobClick(job)}>
                                        {job.jobTitle},{index}
                                    </h3>
                                    <div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(job);
                                            }}
                                            className="h-8 w-8 p-0"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <Dialog open={open} onOpenChange={setOpen}>
                                            <DialogTrigger className="rounded-xl hover:bg-neutral-700">
                                                <Button
                                                    variant="secondary"
                                                    className=""
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpen(true);
                                                    }}
                                                >
                                                    remove job
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Remove the job ?</DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to remove this job?
                                                        <span className="block"> You can access the removed jobs in manage jobs</span>
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button variant="outline" onClick={() => setOpen(false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        className="bg-red-700 hover:bg-red-800"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            console.log(index+'jobId forrr remove:',job._id,)
                                                            if (job?._id) HandleRemove(job._id);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-2 mt-2">{job.description}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {job.searchTags?.map((tag, idx) => (
                                        <span key={idx} className="bg-zinc-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-sm text-gray-500 ">
                                    <span className="text-gray-500">posted {getRelativeTime(job.createdAt!)}</span>
                                </div>
                                <div className="text-sm text-gray-800 mt-2 text-end">
                                    <span className="font-bold">applicants: {job.applicantsCount}</span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            {editingJob && <EditJob job={editingJob} isDialogOpen={isDialogOpen} setIsDialogOpen={handleCloseDialog} />}
        </div>
    );
}
