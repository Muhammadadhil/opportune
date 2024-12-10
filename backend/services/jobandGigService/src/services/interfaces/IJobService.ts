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
    getJobs(category:string, applications:string, budgetRange:string, search:string, sort:string): Promise<IJob[] | null>;
    getJobsByClient(id: string): Promise<IJob[] | null>;
    editJob(data: Partial<IJob>): Promise<IJob | null>;
    removeJob(id: string): Promise<IJob | null>;
    applyJob(data: IApplyJob): void;
    approveApplication(data: IApproval): void;
    getJobDetails(jobIds: string[]): Promise<IJob[] | null>;
    getJobDetail(jobId: string): Promise<IJob | null>;
    sendOfferToFreelancer(data: IOffer): void;
}
