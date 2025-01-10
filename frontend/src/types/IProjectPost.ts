
export interface portfolioData {
    freelancerId?: string;
    title: string;
    description: string;
    skills: string[];
    images: File[];
    imageUrls?:string[]
    link: string;
}

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
