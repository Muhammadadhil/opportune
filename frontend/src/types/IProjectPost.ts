
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

// export interface FormData {
//     overview: OverviewData;
//     descriptionData: DescriptonData;
// }

// export interface RootState {
//     formData: FormData;
// }

export type FormData = OverviewData & DescriptionData;

export interface RootState {
    formData: FormData;
}
