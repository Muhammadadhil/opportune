
export interface OverviewData {
    workTitle: string;
    category: string;
    subCategory: string;
    keywords: string[];
}

export interface DescriptionData {
    images: string[];
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
