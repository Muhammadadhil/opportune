import axios from 'axios';
import { IApplicationRepository } from "../../repositories/interfaces/IApplicationRepository";
import { IApplicationService } from "../interfaces/IApplicationService";
import { IApplication } from "../../interfaces/IApplication";
import { IFreelancerData } from '../../interfaces/IFreelancerData';



export class ApplicationSerivce implements IApplicationService {
    private _applicationRepository: IApplicationRepository;
    private jobServiceURL :string;

    constructor(private readonly applicationRepository: IApplicationRepository) {
        this._applicationRepository = applicationRepository;
        this.jobServiceURL = process.env.JOB_SERVICE_URL || '';
    }

    async createApplication(data: IApplication): Promise<IApplication | null> {
        try {
            return this._applicationRepository.create(data);
        } catch (error) {
            console.log("Error in saving application:", error);
            return null;
        }
    }

    async checkApplicationExists(jobId: string, freelancerId: string): Promise<IApplication | null> {
        return this._applicationRepository.findOne({ jobId, freelancerId });
    }

    async getApplicationOfClient(clientId: string, jobId: string) {
        const applications = await this._applicationRepository.find({ clientId, jobId });
        const freelancerIds = applications.map((app) => app.freelancerId);

        // adCh1: take the user info from user service

        if (freelancerIds.length > 0) {
            const response = await axios.get(`http://localhost:4002/user/freelancers`, { params: { ids: freelancerIds } });

            const enrichedApplications = applications.map((app) => ({
                ...app.toObject(),
                freelancerDetails: response.data.find((f: IFreelancerData) => f._id === app.freelancerId.toString()),
            }));

            return enrichedApplications;
        }
    }

    async getApplicationsOfFreelancer(freelancerId: string): Promise<any | null> {
        console.log("In Service layer : )!!!!! getApplicationsOfFreelancer ");

        const applications = await this._applicationRepository.find({ freelancerId });
        const jobIds = applications.map((app) => app.jobId);
 
        console.log(`url :::::: ${this.jobServiceURL}/batch/jobs`);

        const response = await axios.get(`http://localhost:3020/batch/jobs`, { params: { jobIds } });

        const enrichedApplications = applications.map((application) => ({
            ...application.toObject(),
            jobDetails: response.data.find((j: any) => j._id === application.jobId.toString()),
        }));

        console.log("In Service layer : )!!!!! getApplicationsOfFreelancer ");

        return enrichedApplications;
    }
}
