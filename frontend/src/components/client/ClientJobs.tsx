import { getJobs } from "@/api/jobsApi";
import { IJob } from "@/types/IJob";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SkeletonCard from "../common/LoadingSkelton";
import EditJob from "./EditJob";

const CientJobs = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const { data: jobss, isLoading, isError, error } = useJobs(userInfo?._id as string);

    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="container mx-auto py-8 max-w-7xl">
            <div className="p-4 md:p-6 max-w-5xl">
                <h2 className="text-xl font-semibold mb-4">Your Jobs</h2>
                <ul className="space-y-4">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, index) => (
                              <SkeletonCard key={index} />
                          ))
                        : jobss?.data?.map((job, index) => (
                              <li key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                                  <div className="flex justify-between">
                                      <h3 className="font-bold text-lg mb-2 ">{job?.jobTitle}</h3>
                                      <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                              <Ellipsis />
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent className="w-56">
                                              <DropdownMenuLabel>Modify Job</DropdownMenuLabel>
                                              <DropdownMenuSeparator />
                                              <DropdownMenuGroup>
                                                  <DropdownMenuItem>
                                                      Edit Job
                                                      <EditJob job={job}/>
                                                      <DropdownMenuShortcut>
                                                          <Pencil size={16} />
                                                      </DropdownMenuShortcut>
                                                  </DropdownMenuItem>

                                                  <DropdownMenuItem>
                                                      Delete Job
                                                      <DropdownMenuShortcut>
                                                          <Trash2 size={16} />
                                                      </DropdownMenuShortcut>
                                                  </DropdownMenuItem>
                                              </DropdownMenuGroup>
                                          </DropdownMenuContent>
                                      </DropdownMenu>
                                  </div>

                                  <p className="text-gray-600 mb-2">{job?.description}</p>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                      {job?.searchTags?.map((tag, idx) => (
                                          <span key={idx} className="bg-zinc-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                                              {tag}
                                          </span>
                                      ))}
                                  </div>
                                  <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                                      <span>Budget: ${job?.budget}</span>
                                      <span>Skills: {job?.skillsRequired.join(" • ")}</span>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-2">
                                      <span>
                                          Category: {job?.category} &gt; {job?.subCategory}
                                      </span>
                                  </div>
                              </li>
                          ))}
                </ul>
            </div>
        </div>
    );
};

export default CientJobs;
