export interface IGig {
    freelancerId: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    category: string;
    subCategory: string;
    isActive: boolean;
    deliveryTime: Date;
    reviewsCount: number;
    averageRating: number;
    searchTags: string[];
    requirements: string[];
    imageUrls:string[];
}
