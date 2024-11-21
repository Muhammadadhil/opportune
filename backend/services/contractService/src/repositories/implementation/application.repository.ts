import { ObjectId } from "mongoose";
import { IApplication } from "../../interfaces/IApplication";
import ApplicationModel from "../../schema/applications.schema";
import { IApplicationRepository } from "../interfaces/IApplicationRepository";
import { BaseRepository } from "./baseRepository";



export class ApplicationRepository extends BaseRepository<IApplication> implements IApplicationRepository {
    constructor() {
        super(ApplicationModel);
    }

    async updateStatus(applicationId: ObjectId, status: string) {
        return await ApplicationModel.findByIdAndUpdate(applicationId, { status });
    }
}
