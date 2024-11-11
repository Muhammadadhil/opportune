import apiClient from "./axiosInstance";
import { JobData } from "@/types/IProjectPost";

// jobs
export const saveJobPost = async (data: JobData) => {
    return await apiClient.post("/post/job", data);
};

export const getJobs = async (clientId: string) => {
    if (clientId) return await apiClient.get(`/post/jobs/${clientId}`);

    return await apiClient.get(`/post/jobs`);
};

