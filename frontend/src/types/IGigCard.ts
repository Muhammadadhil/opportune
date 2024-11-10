import { ReactSetState } from "@/types/ReactSetState";
import { IGig } from "@/types/IGig";


export interface GigCardProps {
    _id:string
    freelancerId?: string;
    title: string;
    description: string;
    deliveryTime: string;
    price: number;
    category: string;
    subCategory: string;
    rating?: number;
    reviews?: number;
    theme?: string;
    images: string[] | File[];
    imageUrls: string[];
    isProfile?: boolean;
    searchTags: string[];
    requirements: string[];
    handleSave: (data: GigCardProps) => Promise<void>;
    isDialogOpen?: boolean;
    setIsDialogOpen?: ReactSetState<boolean>;
    onUpdate: (gigData: IGig) => void;
}
