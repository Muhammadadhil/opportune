import { IJob } from "../../types/IJob";
import mongoose, { Types } from "mongoose";
import { IApplyJob, IJobService } from "../interfaces/IJobService";
import { RabbitMQProducer } from "../../events/rabbitmq/producer/Producer";
import { IApproval } from "../../types/IApproval";
import axios from 'axios';
import { IJobRepository } from "../../repositories/interfaces/IJobRepository";
import { IOffer } from "../../types/IOffer";
import { IFilters } from "../../types/IFilters";
import { CustomError } from '@_opportune/common'
import { ObjectId } from "mongoose";
import { inject, injectable } from "inversify";
import  { TYPES } from '../../types/types';
import { jobStatus } from "../../enums/jobStatus";

@injectable()
export class JobService implements IJobService {
    constructor(@inject(TYPES.IJobRepository) private _jobRepository: IJobRepository, @inject(TYPES.RabbitMQProducer) private producer: RabbitMQProducer) {}

    private contractServiceUrl = process.env.CONTRACT_SERVICE_URL;

    async getJobs(
        page: number,
        limit: number,
        status:string,
        category: string,
        applications: string,
        budgetRange: string,
        search: string,
        sort: string,
        userId?: ObjectId
    ): Promise<{ Alljobs: IJob[] | null; totalPagesCount: number; jobs?: IJob[] | null }> {
        const filters = {} as any;
        let sortOption;

        if (status){
            filters.status = status;
        } else {
            filters.isActive = true
        }

        if (category) filters.category = category;
        if (applications) filters.applications = { $lte: Number(applications) };
        if (budgetRange) {
            const [min, max] = budgetRange.split("-").map(Number);
            filters.budget = max ? { $gte: min, $lte: max } : { $gte: min };
        }

        if (search) filters.jobTitle = new RegExp(search, "i");

        if (!sort) {
            sortOption = { createdAt: -1 };
        } else {
            sortOption = sort == "newest" ? { createdAt: -1 } : { createdAt: 1 };
        }

        console.log("filters::", filters);


        const totalJobs = await this._jobRepository.getJobsCount(filters);
        let Alljobs = await this._jobRepository.getFilteredJobs(page, limit, filters, sortOption);

        const totalPagesCount = Math.ceil(totalJobs / limit);

        return {
            Alljobs,
            totalPagesCount,
        };
    }

    async getJobsByClient(id: string): Promise<IJob[] | null> {
        console.log("clientId:", id);
        const jobs = await this._jobRepository.findActiveJobs(id);
        return jobs;
    }

    async saveJob(data: IJob): Promise<IJob | null> {
        const newJob = await this._jobRepository.create(data);
        console.log("newGig:", newJob);

        return newJob;
    }

    async editJob(data: Partial<IJob>): Promise<IJob | null> {
        if (!data._id) {
            return null;
        }
        return await this._jobRepository.update(data._id as ObjectId, data);
    }

    async removeJob(id: string): Promise<IJob | null> {
        console.log("jobId to delete:", id);
        return await this._jobRepository.updateActiveStatus(id);
    }

    async applyJob(data: IApplyJob) {
        await this.producer.connect();

        // const response = await axios.get(`${this.contractServiceUrl}/application`, {
        //     params: { jobId: data.jobId, freelancerId: data.freelancerId },
        // });

        // if (response.data.exists) {
        //     throw new CustomError("You have already applied for this job", 400);
        // }

        console.log("In service layer: going to publish the message with data:", data);
        const trackingId = new mongoose.Types.ObjectId().toString();

        const messagePayload = {
            ...data,
            trackingId,
        };

        await this.producer.publish("job.application.created", messagePayload);

        // update applicants count
        const updated = await this._jobRepository.updateApplicantsCount(data.jobId, data.freelancerId);
        console.log("updated:", updated);

        return {
            trackingId,
            data: messagePayload,
        };
    }

    async approveApplication(data: IApproval) {
        await this.producer.connect();
        console.log("going to publish message with data:", data);

        const exchangeName = "job_approval_exchange";
        await this.producer.publishToMultiple(exchangeName, data);
    }

    async getJobDetails(jobIds: string[]): Promise<IJob[] | null> {
        console.log("jobIds to fetch jobs details:", jobIds);
        return await this._jobRepository.find({ _id: { $in: jobIds } });
    }

    /**
     * @description Fetches the job with the given jobId.
     * @param jobId The id of the job to be fetched.
     * @returns The job with the given jobId if exists, else null.
     */
    async getJobDetail(jobId: ObjectId): Promise<IJob | null> {
        return await this._jobRepository.findById(jobId);
    }

    /**
     * @description Publishes an offer to the given freelancer.
     * @param data The data of the offer to be published.
     * @returns A promise that resolves when the message has been published.
     */
    async sendOfferToFreelancer(data: IOffer) {
        await this.producer.connect();
        console.log("going to publish message with data:", data);

        const exchangeName = "offer_created_exchange";
        await this.producer.publishToMultiple(exchangeName, data);
    }

    async deactivateJob(jobId: ObjectId): Promise<IJob | null> {
        return await this._jobRepository.update(jobId, { isActive:false,status:jobStatus.CLOSED });
    }
}
