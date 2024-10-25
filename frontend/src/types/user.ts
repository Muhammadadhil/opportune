export interface userState {
    userInfo: userInfo | null;
    freelancerData: object;
    clientData:object;
    isAdminAuthenticated: boolean;
}

export interface userInfo {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    country: string;
}

export interface IFreelancer {
    userId: string;
    title: string;
    skills: string[];
    accounts: any; 
    image: string; 
}
