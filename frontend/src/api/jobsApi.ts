import apiClient from "./axiosInstance";
import { JobData } from "@/types/IProjectPost";
import { IJob } from "@/types/IJob";
import { IApplication } from "@/types/IApplication";


// jobs
export const saveJobPost = async (data: JobData) => {
    return await apiClient.post("/post/job", data);
};

export const getJobs = async (clientId?: string) => {
    if (clientId) return await apiClient.get(`/post/jobs/${clientId}`);
    return await apiClient.get(`/post/jobs`);
};

export const editJob = async (data: IJob): Promise<IJob> => {
    return await apiClient.patch("/post/job", data);
};

export const removeJob = async (jobId: string) => {
    return await apiClient.patch(`/post/job/${jobId}`);
};

export const applyJob = async (data:IApplication) => {
    return await apiClient.post(`/post/job/application`, data);
};

