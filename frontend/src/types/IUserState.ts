export interface userState {
    userInfo: userInfo;
    freelancerData: IFreelancer;
    clientData: IClientData;
    isAdminAuthenticated: boolean;
}

export type userInfo = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    country: string;
} | null

export interface IFreelancer {
    userId: string;
    title: string;
    skills: string[];
    accounts: any;
    image: string;
    imageUrl?: string;
    preferredJobs: string[];
}

export interface IClientData {
    userId: string;
    companyName?: string;
    companyDescription?: string;
    projectNeeds: string[];
    website?: string;
}