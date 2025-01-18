import { Button } from "../ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Pencil } from "lucide-react";
import { useRemoveJob } from "@/hooks/jobs/useDeleteJob";
import EditJob from "../client/EditJob";
import toast from "react-hot-toast";
import { IJob } from "@/types/IJob";
import JobSideBar from "./JobSideBar";
import { getRelativeTime } from "@/utils/relativeDateFormatter";
import ConfirmDialog from "./ConfirmDialog";
import { deactivateJob } from "@/api/job";

interface JobCardProps {
    job: IJob;
    onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
    const [editingJob, setEditingJob] = useState<IJob | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [deactivate, setDeactivate] = useState(false);

    const { userInfo, isAdminAuthenticated } = useSelector((state: RootState) => state.user);

    const handleEditClick = (job: IJob) => {
        setEditingJob(job);
        setIsDialogOpen(true);
    };

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
    const isAdmin =  isAdminAuthenticated;

    const handleDeactivate = async (jobId:string) => {
        try {
            const response = await deactivateJob(jobId);
            console.log('response:',response);
            setDeactivate(false)
            onApply();
            
        } catch (error) {
            console.log(error);
            toast.error('Error in deactivating job')
        }
    };

    console.log('isAdmin:',isAdmin );

    return (
        <div onClick={() => setSheetOpen(true)}>
            <li key={job._id} className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 ease-in-out cursor-pointer">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{job.jobTitle}</h3>
                {isAdmin && job.isActive && (
                    <div className="flex justify-end">
                        <Button onClick={() => setDeactivate(true)} className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800">
                            Deactivate job
                        </Button>
                    </div>
                )}
                
                {isAdmin && !job.isActive && (
                    <div className="flex justify-end">
                        <Button onClick={() => setDeactivate(true)} className="bg-green-600 hover:bg-green-700">
                            activate job
                        </Button>
                    </div>
                )}
                <ConfirmDialog
                    action="Deactivate"
                    title="Are you sure want to deactivate"
                    description1="This is remove the job listed anywhere"
                    open={deactivate}
                    setOpen={setDeactivate}
                    onConfirm={handleDeactivate}
                    id={job._id!}
                />
                {isClient && (
                    <div>
                        <button onClick={() => handleEditClick(job)} className="h-8 w-8 p-0">
                            <Pencil size={16} />
                        </button>
                        <ConfirmDialog
                            title="Remove the job ?"
                            description1="Are you sure you want to remove this job?"
                            description2="You can access the removed jobs in manage jobs"
                            open={open}
                            setOpen={setOpen}
                            onConfirm={HandleRemove}
                            id={job._id!}
                        />
                    </div>
                )}
                <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">{job.subCategory}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                    {job.skillsRequired.map((skill, index) => (
                        <span key={index} className="bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-sm border dark:border-gray-800">
                            {skill}
                        </span>
                    ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row sm:justify-between">
                    <span>Budget: ${job.budget}</span>
                    <span>applicants: {job.applicantsCount}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-end">
                    <span>posted {getRelativeTime(job.createdAt!)}</span>
                </div>
                {sheetOpen && <JobSideBar job={job} sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} onApply={onApply} />}
                {editingJob && <EditJob job={editingJob} isDialogOpen={isDialogOpen} setIsDialogOpen={handleCloseDialog} />}
            </li>
        </div>
    );
};

export default JobCard;
