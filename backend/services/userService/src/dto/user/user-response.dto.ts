// user.dto.ts
export interface UserDTO {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    role: string;
    isVerified: boolean;
    isBlocked: boolean;
    averageRating: number;
    reviewCount: number;
}
// user-response.dto.ts
export interface FreelancerDetailsDTO {
    _id: string;  // String representation of ObjectId
    userId: string;  // String representation of ObjectId
    title: string;
    skills: string[];
    accounts: {
        linkedin: string;
        github: string;
        other: string;
    };
    imageUrl: string;
    prefferedJobs: string[];
}

export interface FreelancerResponseDTO {
    _id: string;  // String representation of ObjectId
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    role: string;
    isVerified: boolean;
    isBlocked: boolean;
    averageRating: number;
    reviewCount: number;
    freelancerDetails?: FreelancerDetailsDTO;
}