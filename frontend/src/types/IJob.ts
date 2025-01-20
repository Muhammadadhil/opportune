export enum jobStatus {
    OPEN = "open",
    CLOSED = 'closed',
    FLAGGED = 'flagged',
    ARCHIVED = 'archived' 
}

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
    status: jobStatus;
    searchTags: string[];
    applicants?: string[];
    applicantsCount?: number;
    createdAt?: string;
    isApplied?: boolean;
}
