import {IJob} from './IJob';

interface IFreelancerData {
    _id:string;
    firstname: string;
    lastname: string;
    email: string;
    country: string;
}

export interface IApplication {
    _id?: string;
    jobId: string;
    clientId: string;
    freelancerId: string;
    status?: string;
    freelancerDetails?: IFreelancerData;
    jobDetails?: IJob;
    freelancerNotes?: string;
    freelancerPrice?: number;
    createdAt?: string;
    cvKey?: string;
    cvFileType?: string;
}