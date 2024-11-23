import { IApproval } from "../../interfaces/IApproval";
import { IJob } from "../../interfaces/IJob";
 
export interface IApplyJob {
    jobId: string;
    clientId: string;
    freelancerId: string;
    freelancerNotes?: string;
    freelancerPrice?:number;
}   

export interface IJobService {
    saveJob(data: IJob): Promise<IJob | null>;
    getJobs(): Promise<IJob[] | null>;
    getJobsByClient(id: string): Promise<IJob[] | null>;
    editJob(data: Partial<IJob>): Promise<IJob | null>;
    removeJob(id: string): Promise<IJob | null>;
    applyJob(data: IApplyJob): void;
    approveApplication(data:IApproval):void;
    getJobDetails(jobIds: string[]): Promise<IJob[] | null>;
}
