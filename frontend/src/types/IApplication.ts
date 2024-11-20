

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
    freelancerDetails: IFreelancerData;
}