import jwt, { JwtPayload } from "jsonwebtoken";
import { generateAccessToken } from "../utils/jwt/generateToken";
import axios from "axios";
import { UserRepository } from "../repositories/UserRepository";
import IUser from "../interfaces/IUser";
import { auth } from "google-auth-library";

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async refreshAccessToken(refreshToken: string): Promise<string | null> {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET!) as JwtPayload;
            if (!decoded) {
                console.log("invalid token");
                return null;
            }
            const { userId, role } = decoded;
            console.log("userId: role: from decoded obj:", userId, role);

            const newAccessToken = generateAccessToken(userId, role);
            return newAccessToken;
        } catch (error) {
            return null;
        }
    }

    async getUserInfo(token: string,authType: string, role?: string, ) {
        console.log("google get userInfo service!!");

        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        const data = response.data;
        data.role = role;
        console.log("googleapi response data:", data);

        let user = await this.userRepository.findUserByEmail(data.email);

        console.log('authType in userService:',authType);
        
        if(user && authType=='login'){
            return user;
        }

        //for signup:user shouldnot exist 
        if (user && authType!="login") {
            return 'user already exists'
        }

        const googleUser: Partial<IUser> = {
            firstname: data.given_name,
            lastname: data.family_name,
            email: data.email,
            role: data.role,
            isOAuthUser: true,
        };

        if(!user){
            user = await this.userRepository.createUser(googleUser as IUser);
        }

        console.log("typeof userobj:", typeof user);
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }
}
