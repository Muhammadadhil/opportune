import { IJob } from "../../interfaces/IJob";
 
export interface IApplyJob {
    jobId: string;
    clientId: string;
    freelancerId: string;
}   

export interface IJobService {
    saveJob(data: IJob): Promise<IJob | null>;
    getJobs(): Promise<IJob[] | null>;
    getJobsByClient(id: string): Promise<IJob[] | null>;
    editJob(data: Partial<IJob>): Promise<IJob | null>;
    removeJob(id: string): Promise<IJob | null>;
    applyJob(data: IApplyJob): void;
}
