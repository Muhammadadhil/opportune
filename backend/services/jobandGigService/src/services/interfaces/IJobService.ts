import { IJob } from "../../interfaces/IJob";

export interface IJobService {
    saveJob(data:IJob):Promise<IJob | null>;
}
