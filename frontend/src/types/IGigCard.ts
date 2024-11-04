export interface GigCardProps {
    title: string;
    description: string;
    deliveryTime: string;
    price: number;
    category: string;
    subcategory: string;
    rating?: number;
    reviews?: number;
    theme?: string;
    imageUrls: string[];
    isProfile?: boolean;
    searchTags: string[];
    requirements:string[];
}
