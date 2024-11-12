import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useJobs } from "@/hooks/jobs/useJobs";
import { useState } from "react";
import { IJob } from "@/types/IJob";
import { Pencil } from "lucide-react";

import SkeletonCard from "../common/LoadingSkelton";
import EditJob from "./EditJob";

export default function ClientJobs() {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const { data: jobs, isLoading, refetch } = useJobs(userInfo?._id as string);
    const [editingJob, setEditingJob] = useState<IJob | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleEditClick = (job: IJob) => {
        setEditingJob(job);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = async() => {
        setIsDialogOpen(false);
        setEditingJob(null);
        await refetch();
    };
    console.log("updated : ");
    console.count("clientjobs");

    return (
        <div className="container mx-auto py-8 max-w-7xl">
            <div className="p-4 md:p-6 max-w-5xl">
                <h2 className="text-xl font-semibold mb-4">Your Jobs</h2>
                <ul className="space-y-4">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                        : jobs?.data?.map((job:IJob) => (
                              <li key={job._id} className="bg-white p-4 rounded-lg border shadow-sm">
                                  <div className="flex justify-between">
                                      <h3 className="font-bold text-lg mb-2">{job.jobTitle}</h3>
                                      <button onClick={() => handleEditClick(job)} className="h-8 w-8 p-0">
                                          <Pencil size={16} />
                                      </button>
                                  </div>

                                  <p className="text-gray-600 mb-2">{job.description}</p>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                      {job.searchTags?.map((tag, idx) => (
                                          <span key={idx} className="bg-zinc-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                                              {tag}
                                          </span>
                                      ))}
                                  </div>
                                  <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                                      <span>Budget: ${job.budget}</span>
                                      <span>Skills: {job.skillsRequired.join(" • ")}</span>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-2">
                                      <span>
                                          Category: {job.category} &gt; {job.subCategory}
                                      </span>
                                  </div>
                              </li>
                          ))}
                </ul>
            </div>
            {editingJob && <EditJob job={editingJob} isDialogOpen={isDialogOpen} setIsDialogOpen={handleCloseDialog} />}
        </div>
    );
}
