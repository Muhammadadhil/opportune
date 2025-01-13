import { ObjectId } from "mongoose";
import { IApproval } from "../../types/IApproval";
import { IFilters } from "../../types/IFilters";
import { IJob } from "../../types/IJob";
import { IOffer } from "../../types/IOffer";
 
export interface IApplyJob {
    jobId: string;
    clientId: string;
    freelancerId: string;
    freelancerNotes?: string;
    freelancerPrice?:number;
    cvKey?: string;
}   

export interface IJobService {
    saveJob(data: IJob): Promise<IJob | null>;
    getJobs(page: number, limit: number,status?:string, category?: string, applications?: string, budgetRange?: string, search?: string, sort?: string): Promise<{ Alljobs: IJob[] | null; totalPagesCount: number }>;
    getJobsByClient(id: string): Promise<IJob[] | null>;
    editJob(data: Partial<IJob>): Promise<IJob | null>;
    removeJob(id: string): Promise<IJob | null>;
    applyJob(data: IApplyJob): void;
    approveApplication(data: IApproval): void;
    getJobDetails(jobIds: string[]): Promise<IJob[] | null>;
    getJobDetail(jobId: ObjectId): Promise<IJob | null>;
    sendOfferToFreelancer(data: IOffer): void;
    deactivateJob(jobId: ObjectId): Promise<IJob | null>;
}
