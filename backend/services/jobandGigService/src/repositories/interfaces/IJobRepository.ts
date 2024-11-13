import { ObjectId } from "mongoose";
import { IJob } from "../../interfaces/IJob";
import { IBaseRepository } from "./IBaseRepository";

export interface IJobRepository extends IBaseRepository<IJob> {
    updateActiveStatus(id: string): Promise<IJob | null>;
}
