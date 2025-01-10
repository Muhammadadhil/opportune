
export interface portfolioData {
    freelancerId?: string;
    title: string;
    description: string;
    skills: string[];
    images: File[];
    link: string;
}

// export interface DescriptionData {
//     images: File[];
//     deliveryTime: string;
//     description: string;
//     price: string;
//     requirements?:string[];
// }

// export type FormData = portfolioData & DescriptionData;

export interface TitleData {
    jobTitle: string;
    category: string;
    subCategory: string;
    skillsRequired:string[]
}

export interface BudgetData {
    description: string;
    budget: number;
    searchTags: string[];
}

export type JobData = TitleData & BudgetData;


export interface RootState {
    portfolioData: portfolioData;
    jobData: JobData;
}
