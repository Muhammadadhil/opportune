import { ApplicationRepository } from "../../repositories/implementation/application.repository";
import { IApplicationRepository } from "../../repositories/interfaces/IApplicationRepository";
import { IApplicationService } from "../interfaces/IApplicationService";
import { IApplication } from "../../interfaces/IApplication";
import { RabbitMQConsumer } from "../../events/rabbitmq/Consumer";
import { RabbitMQProducer } from "../../events/rabbitmq/Producer";
import { IContract } from "../../interfaces/IContract";
import { ObjectId } from "mongoose";
import axios from 'axios';

interface IFreelancerData {
    _id:string;
    firstname: string;
    lastname: string;
    email: string;
    country: string;
}

export class ApplicationSerivce implements IApplicationService {
    private applicationRepository: IApplicationRepository;
    private consumer;
    private producer;

    constructor() {
        this.applicationRepository = new ApplicationRepository();
        this.consumer = new RabbitMQConsumer();
        this.producer = new RabbitMQProducer();
    }

    async initialize() {
        try {
            await this.consumer.connect();
            await this.producer.connect();

            await this.consumer.consume("job.application.created", (message) => {
                console.log("Processing job application:", message);

                const application = this.createApplication(message);

                if (!application) {
                    throw new Error("failed to create application");
                }
            });
        } catch (error) {
            console.error("Failed to initialize ApplicationService:", error);

            await this.producer.publish("job.application.failed", {
                success: false,
                // error: error?.message || "Application process failed",
                error: "Application process failed",
                timestamp: new Date().toISOString(),
            });
        }
    }

    async createApplication(data: IApplication): Promise<IApplication | null> {
        try {
            console.log("data in createApplication:", data);
            return this.applicationRepository.create(data);
        } catch (error) {
            console.log("Error in saving application:", error);
            return null;
        }
    }

    async checkApplicationExists(jobId: string, freelancerId: string): Promise<IApplication | null> {
        return this.applicationRepository.findOne({ jobId, freelancerId });
    }

    async getApplicationOfClient(clientId: string, jobId:string) {

        const applications=await this.applicationRepository.find({ clientId, jobId });
        const freelancerIds = applications.map((app) => app.freelancerId);

        const response = await axios.post("http://localhost:4002/user/batch/freelancer", { freelancerIds });

        const enrichedApplications = applications.map((app) => ({
            ...app.toObject(),
            freelancerDetails: response.data.find((f: IFreelancerData) => f._id === app.freelancerId.toString()),
        }));
        
        return enrichedApplications;
    }
}
