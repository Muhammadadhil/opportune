import { Button } from "../ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useRemoveJob } from "@/hooks/jobs/useDeleteJob";
import EditJob from "../client/EditJob";
import toast from "react-hot-toast";
import { IJob } from "@/types/IJob";
import JobSideBar from "./JobSideBar";

interface JobCardProps {
    job: IJob;
}
const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const [editingJob, setEditingJob] = useState<IJob | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);

    const { userInfo } = useSelector((state: RootState) => state.user);

    const handleEditClick = (job: IJob) => {
        setEditingJob(job);
        setIsDialogOpen(true);
    };
    // const { data: jobs, refetch } = useJobs(userInfo?._id as string);

    const removeJobMutation = useRemoveJob();

    const HandleRemove = async (jobId: string) => {
        await removeJobMutation.mutateAsync(jobId);
        // refetch();
        toast.success("Job successfully removed");
    };

    const handleCloseDialog = async () => {
        setIsDialogOpen(false);
        setEditingJob(null);
        // await refetch();
    };

    const isClient = userInfo?.role == "client";

    return (
        <div onClick={() => setSheetOpen(true)}>
            <li key={job._id} className="bg-white p-4 rounded-lg border shadow-sm hover:bg-gray-50 transition-all duration-300 ease-in-out cursor-pointer">
                <h3 className="font-bold text-lg mb-2 text-gray-700">{job.jobTitle}</h3>
                {isClient && (
                    <div>
                        <button onClick={() => handleEditClick(job)} className="h-8 w-8 p-0">
                            <Pencil size={16} />
                        </button>

                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger className=" rounded-xl transition duration-300 ease-in-out">
                                <Button variant="secondary" className="">
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
                                    <Button variant="default" onClick={() => job?._id && HandleRemove(job?._id)}>
                                        Remove
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
                <p className="text-gray-900 mb-2 text-sm">{job.subCategory}</p>
                <p className="text-gray-600 mb-2 text-sm">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-2">
                    {job.skillsRequired.map((skill, index) => (
                        <span key={index} className="bg-zinc-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                            {skill}
                        </span>
                    ))}
                </div>
                <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                    <span>Budget: ₹{job.budget}</span>
                    <span>Proposals: 5 to 10 </span>
                </div>

                {sheetOpen && <JobSideBar job={job} sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />}
                {editingJob && <EditJob job={editingJob} isDialogOpen={isDialogOpen} setIsDialogOpen={handleCloseDialog} />}
            </li>
        </div>
    );
};

export default JobCard;
