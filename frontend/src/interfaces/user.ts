export interface userState {
    userInfo: userInfo | null;
}

export interface userInfo {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    country: string;
}
