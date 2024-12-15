import { ObjectId } from "mongoose";
import { IApproval } from "../../interfaces/IApproval";
import { IFilters } from "../../interfaces/IFilters";
import { IJob } from "../../interfaces/IJob";
import { IOffer } from "../../interfaces/IOffer";
 
export interface IApplyJob {
    jobId: string;
    clientId: string;
    freelancerId: string;
    freelancerNotes?: string;
    freelancerPrice?:number;
}   

export interface IJobService {
    saveJob(data: IJob): Promise<IJob | null>;
    getJobs(page: number, limit: number, category?: string, applications?: string, budgetRange?: string, search?: string, sort?: string): Promise<{ Alljobs: IJob[] | null; totalPagesCount: number }>;
    getJobsByClient(id: string): Promise<IJob[] | null>;
    editJob(data: Partial<IJob>): Promise<IJob | null>;
    removeJob(id: string): Promise<IJob | null>;
    applyJob(data: IApplyJob): void;
    approveApplication(data: IApproval): void;
    getJobDetails(jobIds: string[]): Promise<IJob[] | null>;
    getJobDetail(jobId: ObjectId): Promise<IJob | null>;
    sendOfferToFreelancer(data: IOffer): void;
}
