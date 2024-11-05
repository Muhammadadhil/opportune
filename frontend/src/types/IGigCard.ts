export interface GigCardProps {
    freelancerId?:string;
    title: string;
    description: string;
    deliveryTime: string;
    price: number;
    category: string;
    subCategory: string;
    rating?: number;
    reviews?: number;
    theme?: string;
    images:string[] | File[];
    imageUrls: string[];
    isProfile?: boolean;
    searchTags: string[];
    requirements:string[];
}
