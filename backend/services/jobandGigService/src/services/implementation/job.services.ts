import { IJob } from "../../interfaces/IJob";
import { JobRepository } from "../../repositories/implementation/job.repositoty";


export class JobService {

    private jobRepository;

    constructor() {
        this.jobRepository=new JobRepository();
    }

    async saveJob(data:IJob): Promise<IJob | null> {
        
        const newJob = await this.jobRepository.create(data);
        console.log("newGig:", newJob);

        return newJob;
    }
}
