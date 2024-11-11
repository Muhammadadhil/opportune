import { ObjectId } from "mongoose";
import { IJob } from "../../interfaces/IJob";
import JobModel from "../../schema/job.schema";
import { IJobRepository } from "../interfaces/IJobRepository";
import { BaseRepository } from "./baseRepository";

export class JobRepository extends BaseRepository<IJob> implements IJobRepository {
    constructor() {
        super(JobModel);
    }
}
