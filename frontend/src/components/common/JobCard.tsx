import { Button } from "../ui/button1";
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
import { changeJobStatus } from "@/api/job";
import { useQueryClient } from "@tanstack/react-query";

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
    const [activate, setActivate] = useState(false);
    const [flag, setFlag] = useState(false);
    const [unflag, setUnFlag] = useState(false);

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
    const isAdmin = isAdminAuthenticated;

    const queryClient = useQueryClient();
    // admin change job status
    const handleChangeStatus = async (jobId: string, status: string) => {
        try {
            await changeJobStatus(jobId, status);
            setDeactivate(false);
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
        } catch (error) {
            console.log(error);
            toast.error("Error in deactivating job");
        }
    };

    console.log("isAdmin:", isAdmin);

    return (
        <div onClick={() => setSheetOpen(true)}>
            <li
                key={job._id}
                className={`bg-white dark:bg-black text-gray-900 dark:text-gray-100 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 ease-in-out cursor-pointer ${
                    job.status == "flagged" && "border-red-800"
                }`}
            >
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{job.jobTitle}</h3>
                <div className="flex gap-4 justify-end">
                    {isAdmin && job.isActive && job.status !== "flagged" && (
                        <div className="flex justify-end">
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFlag(true);
                                }}
                            >
                                Flag for Review
                            </Button>
                        </div>
                    )}

                    {isAdmin && job.isActive && job.status == "flagged" && (
                        <div className="flex justify-end">
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setUnFlag(true);
                                }}
                            >
                                Unflag
                            </Button>
                        </div>
                    )}

                    {isAdmin && job.isActive && (
                        <div className="flex ">
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeactivate(true);
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800"
                            >
                                Deactivate job
                            </Button>
                        </div>
                    )}
                </div>

                {isAdmin && !job.isActive && (
                    <div className="flex justify-end">
                        <Button onClick={() => setActivate(true)} className="bg-green-600 hover:bg-green-700">
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
                    onConfirm={() => handleChangeStatus(job._id!, "closed")}
                    id={job._id!}
                />
                <ConfirmDialog
                    action="Activate"
                    title="Are you sure want to activate the job"
                    description1="This will make the job visible"
                    open={activate}
                    setOpen={setActivate}
                    onConfirm={() => handleChangeStatus(job._id!, "open")}
                    id={job._id!}
                />
                <ConfirmDialog
                    action="Flag to Review"
                    title="Are you sure want to flag the job"
                    description1="This job will be displayed to the users , but it will be under review"
                    open={flag}
                    setOpen={setFlag}
                    onConfirm={() => {
                        handleChangeStatus(job._id!, "flagged");
                        setFlag(false);
                    }}
                    id={job._id!}
                />
                <ConfirmDialog
                    action="Unflag"
                    title="Are you sure want to Unflag the job"
                    description1="This job will be displayed to the users "
                    open={unflag}
                    setOpen={setUnFlag}
                    onConfirm={() => {
                        handleChangeStatus(job._id!, "open");
                        setUnFlag(false);
                    }}
                    id={job._id!}
                />

                {isClient && job.clientId?._id == userInfo._id && (
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
                <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">{job.description.slice(0, 100)}</p>
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
