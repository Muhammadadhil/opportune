import { ObjectId } from "mongoose";
import { IApplication } from "../../interfaces/IApplication";
import { IBaseRepository } from "./IBaseRepository";

export interface IApplicationRepository extends IBaseRepository<IApplication> {
    updateStatus(applicationId: ObjectId, status: string): Promise<IApplication | null>;
}
