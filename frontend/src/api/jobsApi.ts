import apiClient from "./axiosInstance";
import { JobData } from "@/types/IProjectPost";
import { IJob } from "@/types/IJob";
import { IApplication } from "@/types/IApplication";
import {IApproval} from '@/types/IApproval';                                             

// jobs
export const saveJobPost = async (data: JobData) => {
    return await apiClient.post("/post/job", data);
};

export const getJobs = async (clientId?: string,filters?:any) => {
    if (clientId) return await apiClient.get(`/post/jobs/${clientId}`);
    if(filters) return await apiClient.get(`/post/jobs`, { params: { filters } });
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

export const getApplications = async (clientId:string,jobId:string) => {
    return await apiClient.get(`/contract/client/job/applications`, { params: { clientId, jobId } });
};

export const approveApplication = async (data: IApproval) => {
    return await apiClient.post(`/post/job/approve`, data);
};

export const getFApplications = async (fId:string) => {
    return await apiClient.get(`/contract/freelancer/job/applications`, { params: { fId } });
};

export const getHires = async (jobId:string) => {
    return await apiClient.get(`/contract/client/hires`, { params: { jobId } });
};

export const getJobDetails = async (jobId:string) => {
    return await apiClient.get(`/post/job/${jobId}`);
};
