import { IJob } from "../../interfaces/IJob";
import { JobRepository } from "../../repositories/implementation/job.repositoty";
import mongoose, { Types } from "mongoose";
import { IApplyJob, IJobService } from "../interfaces/IJobService";
import { RabbitMQProducer } from "../../events/rabbitmq/Producer";

export class JobService implements IJobService {
    private jobRepository;
    private producer = new RabbitMQProducer();

    constructor() {
        this.jobRepository = new JobRepository();
        this.intialize();
    }

    async intialize() {
        await this.producer.connect();
    }

    async getJobs(): Promise<IJob[] | null> {
        return await this.jobRepository.find({ isActive: true });
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
        // sent to queue and save it in contract service : application model
        console.log("In service layer: going to publish the message with data:", data);

        const trackingId = new mongoose.Types.ObjectId().toString();

        const messagePayload = {
            ...data,
            trackingId
        };
        await this.producer.publish("job.application.created", messagePayload);

        return {
            trackingId,
            data: messagePayload,
        };
    }
}
