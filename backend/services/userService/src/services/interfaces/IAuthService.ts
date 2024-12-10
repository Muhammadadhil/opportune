

export default interface IAuthService { 
    refreshAccessToken(refreshToken: string): Promise<string | null>;
    getUserInfo(token: string, role?: string): Promise<any>;
}