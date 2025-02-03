export interface Project {
    title: string;
    description: string;
    stars?: number;
    link?: string;
}

export interface Article {
    title: string;
    date: string;
    category: string;
    link?: string;
    views?: number;
    slides?: number;
}
