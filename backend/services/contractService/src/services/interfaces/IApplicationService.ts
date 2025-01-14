import { ObjectId } from "mongoose";
import { IApplication } from "../../interfaces/IApplication";

export interface IApplicationService {
    createApplication(data: IApplication): Promise<IApplication | null>;
    checkApplicationExists(jobId: string, freelancerId: string): Promise<IApplication | null>;
    getApplicationOfClient(client: string, jobId: string): Promise<any | null>;
    getApplicationsOfFreelancer(freelancerId: string): Promise<IApplication | null>;
    getApplicationDetails(jobId: string, freelancerId: string): Promise<IApplication | null>;
}