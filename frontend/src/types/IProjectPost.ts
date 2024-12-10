
export interface OverviewData {
    title: string;
    category: string;
    subCategory: string;
    searchTags: string[];
}

export interface DescriptionData {
    images: File[];
    deliveryTime: string;
    description: string;
    price: string;
    requirements?:string[];
}

export type FormData = OverviewData & DescriptionData;

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
    formData: FormData;
    jobData: JobData;
}
