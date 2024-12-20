export interface userState {
    userInfo: userInfo ;
    freelancerData: IFreelancer;
    clientData: object;
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
    imageUrl?:string;
}
