import { ObjectId } from "mongoose";
import { IApplication } from "../../interfaces/IApplication";

export interface IApplicationService {
    initialize(): void;
    createApplication(data: IApplication): Promise<IApplication | null>;
    checkApplicationExists(jobId: string, freelancerId: string): Promise<IApplication | null>;
    getApplicationOfClient(client: string, jobId:string): Promise<IApplication[] | null>;
}
