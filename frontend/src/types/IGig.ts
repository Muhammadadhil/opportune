export interface IGig {
    _id:string
    freelancerId: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    category: string;
    subCategory: string;
    isActive: boolean;
    deliveryTime: string;
    reviewsCount: number;
    averageRating: number;
    searchTags: string[];
    requirements: string[];
    imageUrls:string[];
}
