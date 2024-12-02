import { IJob } from "../../interfaces/IJob";
import { JobRepository } from "../../repositories/implementation/job.repositoty";
import mongoose, { Types } from "mongoose";
import { IApplyJob, IJobService } from "../interfaces/IJobService";
import { RabbitMQProducer } from "../../events/rabbitmq/Producer";
import { IApproval } from "../../interfaces/IApproval";
import axios from 'axios';
import { HTTPError } from "../../utils/HttpError";
import { IJobRepository } from "../../repositories/interfaces/IJobRepository";
import { IOffer } from "../../interfaces/IOffer";
import { IFilters } from "../../interfaces/IFilters";

export class JobService implements IJobService {
    private jobRepository: IJobRepository;
    private producer = new RabbitMQProducer();

    constructor() {
        this.jobRepository = new JobRepository();
        this.intialize();
    }

    async intialize() {
        await this.producer.connect();
    }

    async getJobs(category: string, applications: string, budgetRange: string, search: string, sort: string): Promise<IJob[] | null> {
        

        const filters = {} as any;

        if (category) filters.category = category;
        if (applications) filters.applications = { $lte: Number(applications) };
        if (budgetRange) {
            const [min, max] = budgetRange.split("-").map(Number);
            filters.budget = max ? { $gte: min, $lte: max } : { $gte: min };
        }
        if (search) filters.jobTitle = new RegExp(search, "i");

        const sortOption = sort === "latest" ? { createdAt: -1 } : { createdAt: 1 };

        console.log("filters in service layer:", filters);

        // return await this.jobRepository.find({ isActive: true });
        return await this.jobRepository.getFilteredJobs(filters, sortOption);
    }

    async getJobsByClient(id: string): Promise<IJob[] | null> {
        console.log("clientId:", id);
        const jobs = await this.jobRepository.findActiveJobs(id);
        return jobs;
    }

    async saveJob(data: IJob): Promise<IJob | null> {
        const newJob = await this.jobRepository.create(data);
        console.log("newGig:", newJob);

        return newJob;
    }

    async editJob(data: Partial<IJob>): Promise<IJob | null> {
        if (!data._id) {
            return null;
        }
        return await this.jobRepository.update(data._id as string, data);
    }

    async removeJob(id: string): Promise<IJob | null> {
        console.log("jobId to delete:", id);
        return await this.jobRepository.updateActiveStatus(id);
    }

    async applyJob(data: IApplyJob) {
        const response = await axios.get(`http://localhost:4002/contract/application`, {
            params: { jobId: data.jobId, freelancerId: data.freelancerId },
        });

        if (response.data.exists) {
            throw new HTTPError("You have already applied for this job", 401);
        }

        console.log("In service layer: going to publish the message with data:", data);
        const trackingId = new mongoose.Types.ObjectId().toString();

        const messagePayload = {
            ...data,
            trackingId,
        };

        await this.producer.publish("job.application.created", messagePayload);

        // update applicants count
        await this.jobRepository.updateApplicantsCount(data.jobId);

        return {
            trackingId,
            data: messagePayload,
        };
    }

    async approveApplication(data: IApproval) {
        console.log("going to publish message with data:", data);

        const exchangeName = "job_approval_exchange";
        await this.producer.publishToMultiple(exchangeName, data);
    }

    async getJobDetails(jobIds: string[]): Promise<IJob[] | null> {
        console.log("jobIds to fetch jobs details:", jobIds);
        return await this.jobRepository.find({ _id: { $in: jobIds } });
    }

    /**
     * @description Fetches the job with the given jobId.
     * @param jobId The id of the job to be fetched.
     * @returns The job with the given jobId if exists, else null.
     */
    async getJobDetail(jobId: string): Promise<IJob | null> {
        return await this.jobRepository.findById(jobId);
    }

    /**
     * @description Publishes an offer to the given freelancer.
     * @param data The data of the offer to be published.
     * @returns A promise that resolves when the message has been published.
     */
    async sendOfferToFreelancer(data: IOffer) {
        console.log("going to publish message with data:", data);

        const exchangeName = "offer_created_exchange";
        await this.producer.publishToMultiple(exchangeName, data);
    }
}
