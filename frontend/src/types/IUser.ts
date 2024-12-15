
export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    country?: string;
    password: string;
    role: string;
    isOAuthUser: boolean;
    isBlocked: boolean;
}
