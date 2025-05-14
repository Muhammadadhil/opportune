import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useJobs } from "@/hooks/jobs/useJobs";
import { useState } from "react";
import { IJob } from "@/types/IJob";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button1";
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
            <div className="p-4 max-w-5xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Jobs</h2>
                <ul className="space-y-4">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                    ) : jobs?.data?.length === 0 ? (
                        <Nojobs />
                    ) : (
                        jobs?.data?.map((job: IJob) => (
                            <li key={job._id} className="bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all duration-300 ease-in-out cursor-pointer">
                                <div className="flex justify-between">
                                    <h3 
                                        className="font-bold text-lg mb-2 hover:underline text-gray-900 dark:text-white" 
                                        onClick={() => handleJobClick(job)}
                                    >
                                        {job.jobTitle}
                                    </h3>
                                    <div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(job);
                                            }}
                                            className="h-8 w-8 p-0 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <Dialog open={open} onOpenChange={setOpen}>
                                            <DialogTrigger>
                                                <Button
                                                    variant="secondary"
                                                    className=" bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 gap-4"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpen(true);
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                    Remove job
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                                                <DialogHeader>
                                                    <DialogTitle className="text-gray-900 dark:text-white">Remove the job?</DialogTitle>
                                                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                                                        Are you sure you want to remove this job?
                                                        <span className="block">You can access the removed jobs in manage jobs</span>
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button 
                                                        variant="outline" 
                                                        onClick={() => setOpen(false)}
                                                        className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        className="bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900 text-white"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
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

                                <p className="text-gray-600 dark:text-gray-400 mb-2 mt-2">{job.description.slice(0,150)}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {job.searchTags?.map((tag, idx) => (
                                        <span key={idx} className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <span>posted {getRelativeTime(job.createdAt!)}</span>
                                </div>
                                <div className="text-sm text-gray-800 dark:text-gray-200 mt-2 text-end">
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
