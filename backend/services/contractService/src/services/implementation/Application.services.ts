import axios from 'axios';
import { IApplicationRepository } from "../../repositories/interfaces/IApplicationRepository";
import { IApplicationService } from "../interfaces/IApplicationService";
import { IApplication } from "../../interfaces/IApplication";
import { IFreelancerData } from '../../interfaces/IFreelancerData';

export class ApplicationSerivce implements IApplicationService {
    private _applicationRepository: IApplicationRepository;

    constructor(private readonly applicationRepository: IApplicationRepository) {
        this._applicationRepository = applicationRepository;
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

        const response = await axios.get(`http://localhost:4002/user/freelancers`,{params:{ids:freelancerIds}});

        const enrichedApplications = applications.map((app) => ({
            ...app.toObject(),
            freelancerDetails: response.data.find((f: IFreelancerData) => f._id === app.freelancerId.toString()),
        }));

        return enrichedApplications;
    }

    async getApplicationsOfFreelancer(freelancerId: string): Promise<any | null> {
        const applications = await this._applicationRepository.find({ freelancerId });
        const jobIds= applications.map((app) => app.jobId);

        const response = await axios.get("http://localhost:4002/post/batch/jobs", { params: { jobIds } });
        const enrichedApplications = applications.map((application) => ({
            ...application.toObject(),
            jobDetails: response.data.find((j: any) => j._id === application.jobId.toString()),
        }));
        return enrichedApplications;
        

    };
}
