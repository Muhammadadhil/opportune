interface clientDetails {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    averageRating: number;
    reviewCount: number;
}

export interface IJob {
    _id?: string;
    clientId: clientDetails;
    jobTitle: string;
    description: string;
    category: string;
    subCategory: string;
    budget: number;
    skillsRequired: string[];
    isActive: boolean;
    searchTags: string[];
    applicantsCount?: number;
    createdAt?: string;
}
