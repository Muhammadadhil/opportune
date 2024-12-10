export interface IJob {
    _id?:string
    clientId: string;
    jobTitle: string;
    description: string;
    category: string;
    subCategory: string;
    budget: number;
    skillsRequired: string[];
    isActive: boolean;
    searchTags: string[];
    applicantsCount?:number;
    createdAt?:string;
}
