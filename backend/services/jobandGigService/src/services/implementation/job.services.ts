import { IJob } from "../../interfaces/IJob";
import { JobRepository } from "../../repositories/implementation/job.repositoty";
import { Types } from "mongoose";
import { IApplyJob,IJobService } from "../interfaces/IJobService";
import { RabbitMQProducer } from "../../events/rabbitmq/Producer";




export class JobService implements IJobService {
    private jobRepository;
    private producer = new RabbitMQProducer();

    constructor() {
        this.jobRepository = new JobRepository();
    }

    async intialize() {
        await this.producer.connect();

        // await this.consumer.connect();

        // // Start consuming
        // this.consumer.consume("job.application.created", (message) => {
        //     console.log("Processing job application:", message);
        // });
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
        // return await this.jobRepository.updateActiveStatus(id);
        // sent to queue and save it in contract service : application model

        await this.producer.publish("job.application.created", data);
    }
}
