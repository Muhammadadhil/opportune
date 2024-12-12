import { ObjectId } from "mongoose";
import { IJob } from "../../interfaces/IJob";
import { IBaseRepository } from "./IBaseRepository";

export interface IJobRepository extends IBaseRepository<IJob> {
    updateActiveStatus(id: string): Promise<IJob | null>;
    findActiveJobs(id: string): Promise<IJob[] | null>;
    updateApplicantsCount(jobId: string): void;
    getFilteredJobs(page: number, limit: number, filters: any, sortOption: any): Promise<IJob[] | null>;
    getJobsCount(filters: any): Promise<number>;
}
