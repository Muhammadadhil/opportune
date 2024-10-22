import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';

export default async (req: Request & Partial<{ user: jwt.JwtPayload }>, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'] as string; 
    console.log('header:',header);

            // console.log("req.cookkies:", req.cookies);


    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header is missing or malformed" });
    }
    const token = header.split(" ")[1];

    console.log('token:',token);

    const secret = process.env.JWT_ACCESSTOKEN_SECRET;

    if(!secret){
        throw new Error("JWT Access Token Secret is not defined in env");
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, secret) as JwtPayload;
            console.log("decoded:", decoded);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({message:"not authorised , invalid token"});
        }
    }
};
