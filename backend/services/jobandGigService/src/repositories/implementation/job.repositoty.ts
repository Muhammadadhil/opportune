import { ObjectId } from "mongoose";
import { IJob } from "../../interfaces/IJob";
import JobModel from "../../schema/job.schema";
import { IJobRepository } from "../interfaces/IJobRepository";
import { BaseRepository } from "./baseRepository";

export class JobRepository extends BaseRepository<IJob> implements IJobRepository {
    constructor() {
        super(JobModel);
    }

    async findActiveJobs(id: string): Promise<IJob[] | null> {
        return await JobModel.find({ clientId: id, isActive: true }).sort({ createdAt: -1 }).exec();
    }

    //change active status
    async updateActiveStatus(id: string): Promise<IJob | null> {
        const job = await JobModel.findById(id);
        if (!job) {
            return null;
        }
        job.isActive = false;
        return await job.save();
    }

    async updateApplicantsCount(jobId: string) {
        return await JobModel.findByIdAndUpdate({ _id: jobId }, { $inc: { applicantsCount: 1 } }, { new: true }).exec();
    }

    async getFilteredJobs(page: number, limit: number, filters: any, sortOption: any): Promise<IJob[] | null> {
        const skip = (page - 1) * limit;
        return await JobModel.find(filters).sort(sortOption).skip(skip).limit(limit).exec();
    }

    async getJobsCount(filters: any): Promise<number>{
        return await JobModel.countDocuments(filters).exec();
    }
    
}
